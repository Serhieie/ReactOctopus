import { useAuth } from '../../../../hooks';
import styles from './ColumnHeadSkelleton.module.scss';
import clsx from 'clsx';

export const ColumnHeadSkelleton = () => {
  const { theme } = useAuth();

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
