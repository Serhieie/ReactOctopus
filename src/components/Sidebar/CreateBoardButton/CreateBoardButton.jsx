import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

import styles from './CreateBoardButton.module.scss';

const CreateBoardButton = ({ theme }) => {
  return (
    <div
      className={clsx(styles.sidebar_create_con, {
        [styles.sidebar_create_conDark]: theme === 'dark',
        [styles.sidebar_create_conLight]: theme === 'light',
        [styles.sidebar_create_conViolet]: theme === 'violet',
      })}
    >
      <p className={styles.sidebar_create_title}>Create a new board</p>
      <button type="button" className={styles.sidebar_create_btn}>
        <svg className={styles.sidebar_create_ico} width="20" height="20">
          <use xlinkHref={`${LogoSprite}#icon-plus`}></use>
        </svg>
      </button>
    </div>
  );
};

export default CreateBoardButton;
