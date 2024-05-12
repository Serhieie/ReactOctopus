import css from './CardModal.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';
import AddEditCardForm from './AddEditCardForm';

const CardModal = ({ children }) => {
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
      <p className={css.filtersTitle}>Add card</p>
      <div>
        <AddEditCardForm />
        {/* {children} */}
      </div>
    </div>
  );
};

export default CardModal;
