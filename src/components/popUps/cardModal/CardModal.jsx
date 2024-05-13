import css from './CardModal.module.scss';
import clsx from 'clsx';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';
import AddEditCardForm from './AddEditCardForm';
import useClickOnBackdropToCloseModals from '../../../hooks/closeByClick';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';
import { useAuth } from '../../../hooks';

const CardModal = ({ func, columnId }) => {
  const { theme } = useAuth();
  console.log(columnId);

  useClickOnBackdropToCloseModals(func);
  useEscapeKeyToCloseModals(func);

  return (
    <div data-id="modal-backdrop" className={css.backdrop}>
      <div
        className={clsx(css.filterModal, {
          [css.filterModalDark]: theme === 'dark',
          [css.filterModalLight]: theme === 'light',
          [css.filterModalViolet]: theme === 'violet',
        })}
      >
        <CloseModalButton onClick={func} />
        <p className={css.filtersTitle}>Add card</p>
        <div>
          <AddEditCardForm columnId={columnId} />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
