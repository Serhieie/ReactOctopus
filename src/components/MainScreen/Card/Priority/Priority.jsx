import { formatDate } from '../../../../helpers';
import styles from './Priority.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../../hooks';

export const Priority = ({ card, labelColor }) => {
  const { theme } = useAuth();
  const data = formatDate(card.deadline);

  return (
    <div
      className={clsx(styles.priorityInfo, {
        [styles.priorityInfoDark]: theme === 'dark',
        [styles.priorityInfoLight]: theme === 'light',
        [styles.priorityInfoViolet]: theme === 'violet',
      })}
    >
      <div className={styles.priorityWrapper}>
        <span className={styles.prioritySpanLabel}>Priority</span>
        <div className={styles.priority}>
          <div
            className={styles.prioritySpan}
            style={{ backgroundColor: `${labelColor}` }}
          ></div>
          <span className={styles.prioritySpanPriority}>{card.priority}</span>
        </div>
      </div>
      <div className={styles.deadlineWrapper}>
        <span className={styles.prioritySpanLabel}>Deadline</span>
        <span className={styles.prioritySpanDate}>{data}</span>
      </div>
    </div>
  );
};
