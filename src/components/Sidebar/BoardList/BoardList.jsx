import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';
import clsx from 'clsx';

import styles from './BoardList.module.scss';

const BoardList = ({ theme }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        {data.map((index, i) => (
          <BoardListItem
            key={index}
            index={index}
            theme={theme}
            isFirst={i === 0 ? true : false}
          />
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
