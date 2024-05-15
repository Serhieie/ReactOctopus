import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RestrictedRoute, PrivateRoute } from './redirect';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';
import { NotFoundPage, HomePage, AuthPage, WelcomePage } from './pages';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { useAuth } from './hooks';
import { DragDropContext } from 'react-beautiful-dnd';
import { fetchBoards } from './redux/tasks/boards/boardsOperations';
import { selectTasksState } from './redux/tasks/tasksSelectors';
import { useSelector } from 'react-redux';

function App() {
  const { isLogin } = useAuth();
  const reduxState = useSelector(selectTasksState);
  const [state, setState] = useState(reduxState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchBoards());
    }
    dispatch(current());
  }, [dispatch, isLogin]);

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

    const column = state.columns.items.find(
      (column) => column._id === source.droppableId
    );

    const start = state.columns.items.find(
      (column) => column._id === source.droppableId
    );
    const finish = state.columns.items.find(
      (column) => column._id === destination.droppableId
    );

    if (start === finish) {
      const newCards = Array.from(state.cards.items);
      newCards.splice(source.index, 1);
      const dragCard = state.cards.items.find(
        (card) => card._id === draggableId
      );
      newCards.splice(destination.index, 0, dragCard);
      const newColumn = { ...column, cards: newCards };

      const newState = {
        ...state,
        [state.columns]: state.columns.items.map((col) =>
          col._id === newColumn._id ? newColumn : col
        ),
      };
      setState(newState);
      return;
    }

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
          <Route
            path="/home/:boardName"
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
