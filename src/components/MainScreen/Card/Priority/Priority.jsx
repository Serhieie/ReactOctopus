import { formatDate } from '../../../../helpers/formatDate';
import styles from './Priority.module.scss';
import clsx from 'clsx';

export const Priority = ({ card, labelColor }) => {
  const theme = 'Dark';
  const data = formatDate(card.deadline);

  return (
    <div
      className={clsx(styles.priorityInfo, {
        [styles.priorityInfoDark]: theme === 'Dark',
        [styles.priorityInfoLight]: theme === 'Light',
        [styles.priorityInfoViolet]: theme === 'Violet',
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
