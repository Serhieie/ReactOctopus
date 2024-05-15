import css from './FilterModal.module.scss';
import clsx from 'clsx';
import { useAuth, useEscapeKeyToCloseModals, useMedia } from '../../../hooks';
import Filter from './Filter';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';

import { useDispatch } from 'react-redux';
import { setIsFiltersOpen } from '../../../redux/popUps/popUpsSlice';

export const FilterModal = ({ func }) => {
  const { theme } = useAuth();
  const { isMobile } = useMedia();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setIsFiltersOpen(false));
  };

  useEscapeKeyToCloseModals(func);

  return (
    <div
      className={clsx(css.filterModal, {
        [css.filterModalDark]: theme === 'dark',
        [css.filterModalLight]: theme === 'light',
        [css.filterModalViolet]: theme === 'violet',
        [css.mobile]: isMobile,
      })}
    >
      <CloseModalButton onClick={onClose} />
      <p className={css.filtersTitle}>Filters</p>
      <div>
        <Filter />
      </div>
    </div>
  );
};
