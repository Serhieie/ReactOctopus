import css from './FilterModal.module.scss';
import clsx from 'clsx';
import Filter from './Filter';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';

const FilterModal = () => {
  //   const { theme } = useAuth();
  const theme = 'dark';

  return (
    <div
      className={clsx(css.filterModal, {
        [css.filterModalDark]: theme === 'dark',
        [css.filterModalLight]: theme === 'light',
        [css.filterModalViolet]: theme === 'violet',
      })}
    >
      <CloseModalButton />
      <p className={css.filtersTitle}>Filters</p>
      <div>
        <Filter />
        {/* {children} */}
      </div>
    </div>
  );
};

export default FilterModal;
