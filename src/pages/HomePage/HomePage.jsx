import { useDispatch } from 'react-redux';
import { MainScreen } from '../../components/MainScreen/MainScreen';
import { useEffect } from 'react';
import { fetchBoardById } from '../../redux/tasks/boards/boardsOperations';
import { selectBoardsState } from '../../redux/tasks/tasksSelectors';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks';
import useClickOnBackdropToCloseModals from '../../hooks/closeByClick';
import useEscapeKeyToCloseModals from '../../hooks/closeByEscape';

const HomePage = ({ state }) => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();
  const { items: boards, active } = useSelector(selectBoardsState);

  useClickOnBackdropToCloseModals();
  useEscapeKeyToCloseModals();

  useEffect(() => {
    if (boards.length > 0 && !isLoading) {
      if (!active) {
        dispatch(fetchBoardById(boards[0]._id));
      }
      // else dispatch(fetchBoardById(active._id));
    }
  }, [active, dispatch, boards, isLoading]);

  return (
    <>
      <MainScreen state={state} />
    </>
  );
};

export default HomePage;
