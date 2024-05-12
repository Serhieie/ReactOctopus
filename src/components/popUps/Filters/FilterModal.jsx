import css from './FilterModal.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import Filter from './Filter';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';
import { useDispatch } from 'react-redux';
import { setIsFiltersOpen } from '../../../redux/popUps/popUpsSlice';

export const FilterModal = () => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

  const closeFilters = () => {
    dispatch(setIsFiltersOpen(false));
  };

  useEscapeKeyToCloseModals();

  return (
    <div
      className={clsx(css.filterModal, {
        [css.filterModalDark]: theme === 'dark',
        [css.filterModalLight]: theme === 'light',
        [css.filterModalViolet]: theme === 'violet',
      })}
    >
      <CloseModalButton onClick={closeFilters} />
      <p className={css.filtersTitle}>Filters</p>
      <div>
        <Filter />
      </div>
    </div>
  );
};
