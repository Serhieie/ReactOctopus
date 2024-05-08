import { useSelector } from 'react-redux';
import styles from './ColumnHeadSkelleton.module.scss';
import clsx from 'clsx';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

export const ColumnHeadSkelleton = () => {
  const theme = useSelector(selectUserTheme);

  return (
    <div
      className={clsx(styles.columnHead, {
        [styles.columnHeadDark]: theme === 'dark',
        [styles.columnHeadLight]: theme === 'light',
        [styles.columnHeadViolet]: theme === 'violet',
      })}
    >
      <div className={styles.block1}></div>
      <div className={styles.block2}></div>
    </div>
  );
};
