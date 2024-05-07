import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RestrictedRoute from './redirect/RestrictedRoute';
import PrivateRoute from './redirect/PrivateRoute';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { useAuth } from './hooks';
import { DragDropContext } from 'react-beautiful-dnd';
import data from './components/MainScreen/boards.json';

function App() {
  const { isLogin } = useAuth();
  const [state, setState] = useState(data[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch, isLogin]);

  // example
  // const result = {
  //   draggableId: 'task-1',
  //   type: 'type',
  //   reason: 'drop',
  //   souce: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   },
  // };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns.find(
      (column) => column._id === source.droppableId
    );

    const start = state.columns.find(
      (column) => column._id === source.droppableId
    );
    const finish = state.columns.find(
      (column) => column._id === destination.droppableId
    );

    if (start === finish) {
      const newCards = Array.from(column.cards);
      newCards.splice(source.index, 1);
      const dragCard = state.columns
        .flatMap((column) => column.cards)
        .find((card) => card._id === draggableId);
      newCards.splice(destination.index, 0, dragCard);
      const newColumn = { ...column, cards: newCards };
      console.log('COLUMN', column);
      console.log('NEW COLUMN', newColumn);

      const newState = {
        ...state,
        [state.columns]: state.columns.map((col) =>
          col._id === newColumn._id ? newColumn : col
        ),
      };
      console.log(' OLD STATE ', state);
      console.log(' NEW STATE ', newState);
      setState(newState);
      return;
    }

    console.log('Start Column', start);
    console.log('Finish Column ', finish);

    const startCards = Array.from(column.cards);
    startCards.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCards,
    };
    const dragCard = state.columns
      .flatMap((column) => column.cards)
      .find((card) => card._id === draggableId);

    const finishCards = Array.from(column.cards);
    finishCards.splice(destination.index, 0, dragCard);

    const newFinish = {
      ...finish,
      cards: finishCards,
    };

    const newState = {
      ...state,
      [state.columns]: {
        ...state.columns,
        newFinish,
        newStart,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext
      // onDragStart={}
      // onDragUpdate={}
      onDragEnd={onDragEnd}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/home">
                <WelcomePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/auth/:id"
            element={
              <RestrictedRoute redirectTo="/home">
                <AuthPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute redirectTo="/">
                <HomePage state={state} />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </DragDropContext>
  );
}

export default App;
