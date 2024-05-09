import css from './Filter.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const Filter = () => {
  const [filter, setFilter] = useState('');

  const options = [
    { priority: 'Without priority' },
    { priority: 'Low' },
    { priority: 'Medium' },
    { priority: 'High' },
  ];

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const resetFilters = () => {
    setFilter('');
  };

  const elements = options.map((option, index) => (
    <label key={index} className={css.colorFilterRadioLable}>
      <input
        onChange={changeFilter}
        className={css.radioIcon}
        type="radio"
        name="filter"
        value={option.priority}
        checked={filter === option.priority}
      />
      <span
        className={clsx(css.colorFilter, {
          [css.colorFilterWithoutPriority]:
            option.priority === 'Without priority',
          [css.colorFilterLowPriority]: option.priority === 'Low',
          [css.colorFilterMediumPriority]: option.priority === 'Medium',
          [css.colorFilterHighPriority]: option.priority === 'High',
        })}
      >
        <span
          className={clsx(css.colorFilterCenter, {
            [css.colorFilterCenterWithoutPriority]:
              option.priority === 'Without priority',
            [css.colorFilterCenterLowPriority]: option.priority === 'Low',
            [css.colorFilterCenterMediumPriority]: option.priority === 'Medium',
            [css.colorFilterCenterHighPriority]: option.priority === 'High',
          })}
        ></span>
      </span>
      <p className={css.priorityText}>{option.priority}</p>
    </label>
  ));

  return (
    <div className={css.filterContainer}>
      <div className={css.filterOptions}>
        <p className={css.lableColor}>Lable color</p>
        <div className={css.filterForm}>{elements}</div>
      </div>
      <button onClick={resetFilters} className={css.clearAllBtn}>
        Show All
      </button>
    </div>
  );
};

export default Filter;
