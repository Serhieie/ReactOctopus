import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';
import clsx from 'clsx';

import styles from './BoardList.module.scss';

const BoardList = ({ theme }) => {
  return (
    <div
      className={clsx(styles.board_list_container, {
        [styles.board_list_containerDark]: theme === 'dark',
        [styles.board_list_containerLight]: theme === 'light',
        [styles.board_list_containerViolet]: theme === 'violet',
      })}
    >
      <div className={styles.board_list_name}>
        <p>My boards</p>
      </div>
      <div className={styles.board_list_create_btn}>
        <CreateBoardButton theme={theme} />
      </div>
      <ul className={styles.board_list_sheet}>
        <BoardListItem theme={theme} isFirst={true} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
        <BoardListItem theme={theme} />
      </ul>
    </div>
  );
};

export default BoardList;
