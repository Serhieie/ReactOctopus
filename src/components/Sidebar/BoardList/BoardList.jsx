import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';

import './BoardList.scss';

const BoardList = () => {
  return (
    <div className="board-list_container">
      <div className="board-list_name">
        <p>My boards</p>
      </div>
      <div className="board-list_create-btn">
        <CreateBoardButton />
      </div>
      <ul className="board-list_sheet">
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
      </ul>
    </div>
  );
};

export default BoardList;
