import css from './Filter.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../redux/filter/filterSlice';
import { selectFilter } from '../../../redux/filter/filterSelectors';
import { useSelector } from 'react-redux';

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const Filter = () => {
  const filter = useSelector(selectFilter);
  let frontFilter = filter.capitalizeFirstLetter();
  if (frontFilter === 'Without') {
    frontFilter = 'Without priority';
  }

  const { theme } = useAuth();
  const dispatch = useDispatch();

  const options = [
    { priority: 'Without priority' },
    { priority: 'Low' },
    { priority: 'Medium' },
    { priority: 'High' },
  ];
  // without low medium high

  const changeFilter = ({ target }) => {
    let fi = target.value.toLowerCase();
    if (fi.split(' ').length === 2) {
      fi = fi.split(' ')[0];
    }

    dispatch(setFilter(fi));
  };

  const resetFilters = () => {
    dispatch(setFilter(''));
  };

  const elements = options.map((option, index) => (
    <label key={index} className={css.colorFilterRadioLable}>
      <input
        onChange={changeFilter}
        className={css.radioIcon}
        type="radio"
        name="filter"
        value={option.priority}
        checked={frontFilter === option.priority}
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
    <div
      className={clsx(css.filterContainer, {
        [css.filterContainerDark]: theme === 'dark',
        [css.filterContainerLight]: theme === 'light',
        [css.filterContainerViolet]: theme === 'violet',
      })}
    >
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
