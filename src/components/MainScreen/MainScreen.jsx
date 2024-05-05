import styles from './MainScreen.module.scss';
import clsx from 'clsx';
import data from './boards.json';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';

export const MainScreen = () => {
  const theme = 'Dark';
  const board = data[0];

  const addColumnFunc = () => {
    console.log('Add Column');
  };

  return (
    <div
      className={clsx(styles.mainScreen, {
        [styles.mainScreenDark]: theme === 'Dark',
        [styles.mainScreenLight]: theme === 'Light',
        [styles.mainScreenViolet]: theme === 'Violet',
      })}
    >
      {data.length > 0 ? (
        <>
          <div className={styles.mainScreenHead}>
            <h2 className={styles.boardTitle}>Project Office</h2>
            <span className={styles.filters}>Filters</span>
          </div>
          <div className={styles.mainContent}>
            <ColumnList data={board} />
            <AddButton column={true} addFunction={addColumnFunc} />
          </div>
        </>
      ) : (
        <ExplainField />
      )}
    </div>
  );
};
