import styles from './ExplainField.module.scss';
import clsx from 'clsx';

export const ExplainField = () => {
  const theme = 'Violet';

  return (
    <div
      className={clsx(styles.explainField, {
        [styles.explainTextDark]: theme === 'Dark',
        [styles.explainTextLight]: theme === 'Light',
        [styles.explainTextViolet]: theme === 'Violet',
      })}
    >
      <p className={styles.explainText}>
        {' '}
        Before starting your project, it is essential{' '}
        <span className={styles.explainSpan}>to create a board</span> to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </p>
    </div>
  );
};
