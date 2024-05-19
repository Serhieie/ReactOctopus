import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RestrictedRoute, PrivateRoute } from './redirect';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';
import { NotFoundPage, HomePage, AuthPage, WelcomePage } from './pages';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { useAuth } from './hooks';
import { DragDropContext } from 'react-beautiful-dnd';
import { fetchBoards } from './redux/tasks/boards/boardsOperations';
import {
  selectBoardsState,
  selectCardsState,
} from './redux/tasks/tasksSelectors';
import { useSelector } from 'react-redux';
import {
  changeCardIndexOperation,
  moveCardOperation,
} from './redux/tasks/cards/cardsOperations';
import { setToken } from './redux/api/api';
import { setTokenToRedux } from './redux/auth/authSlice';
import {
  changeCardIndexLocal,
  clearTasks,
  moveCardIndexLocal,
} from './redux/tasks/tasksSlice';
import { changeColumnIndexOperation } from './redux/tasks/columns/columnsOperations';

function App() {
  const { isLogin } = useAuth();
  const { active: state } = useSelector(selectBoardsState);
  const { items } = useSelector(selectCardsState);
  const [googleToken] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      dispatch(fetchBoards());
    }
    dispatch(current());
  }, [dispatch, isLogin]);

  useEffect(() => {
    const token = googleToken.get('token');
    if (token) {
      dispatch(clearTasks());
      setToken(token);
      dispatch(current());
      dispatch(setTokenToRedux(token));
    }
    console.log(1);
  }, [googleToken, dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    const card = items.filter((card) => card._id === draggableId)[0];
    const { droppableId, index: destinationIndex } = destination;
    const { index: sourceIndex } = source;

    if (!destination) {
      return;
    }

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      dispatch(
        changeColumnIndexOperation({
          columnId: draggableId,
          boardId: state._id,
          destinationIndex,
        })
      );
    }

    if (source.droppableId === droppableId) {
      dispatch(
        changeCardIndexLocal({
          card,
          destinationColumnId: droppableId,
          destinationIndex,
          sourceIndex,
        })
      );
      dispatch(
        changeCardIndexOperation({
          card,
          destinationColumnId: droppableId,
          destinationIndex,
          sourceIndex,
        })
      );
    } else {
      // dispatch(
      //   moveCardIndexLocal({
      //     card,
      //     destinationColumnId: droppableId,
      //     destinationIndex,
      //     sourceIndex,
      //   })
      // );
      dispatch(
        moveCardOperation({
          card,
          destinationColumnId: droppableId,
          destinationIndex,
          sourceIndex,
        })
      );
    }
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
            path="/auth/google/:token"
            element={
              <RestrictedRoute redirectTo="/home">
                <WelcomePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute redirectTo="/">
                <HomePage active={state} />
              </PrivateRoute>
            }
          />
          <Route
            path="/home/:boardName"
            element={
              <PrivateRoute redirectTo="/">
                <HomePage active={state} />
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
