import { useState } from 'react';
import styles from './Column.module.scss';
import validationTitle from '../../../schemas/validationTitle';
import clsx from 'clsx';
import LogoSprite from '../../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import { addColumnOperation } from '../../../redux/tasks/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import {
  useClickOnBackdropToCloseModals,
  useEscapeKeyToCloseModals,
  useAuth,
} from '../../../hooks';

const MdlColumn = ({ open, onClose }) => {
  const { boardName } = useParams();
  const { theme } = useAuth();
  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState('');
  const [error, setError] = useState('');

  const handleCloseModal = () => {
    onClose();
    setTitleInput('');
    setError('');
  };

  useClickOnBackdropToCloseModals(onClose);
  useEscapeKeyToCloseModals(onClose);

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = validationTitle;
    schema
      .validate({ boardId: boardName, title: titleInput })
      .then((data) => {
        handleCloseModal();
        dispatch(addColumnOperation(data));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {open && (
        <div
          className={clsx(styles.modal, {
            [styles.modalDark]: theme === 'dark',
            [styles.modalLight]: theme === 'light',
            [styles.modalViolet]: theme === 'violet',
          })}
          data-id="modal-backdrop"
        >
          <div
            className={clsx(styles.modalContent, {
              [styles.dark]: theme === 'dark',
              [styles.light]: theme === 'light',
              [styles.violet]: theme === 'violet',
            })}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg className={styles.iconBtn} width="18px" height="18px">
                <use
                  xlinkHref={`${LogoSprite}#icon-x-close`}
                  className={clsx(styles.closeIcon, {
                    [styles.lightCloseButton]: theme === 'light',
                    [styles.violetCloseButton]: theme === 'violet',
                  })}
                />
              </svg>
            </button>
            <div className={styles.titleContainer}>
              <h1
                className={clsx(styles.mainTitle, {
                  [styles.titleDark]: theme === 'dark',
                })}
              >
                Add column
              </h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.title}>
                <input
                  type="text"
                  className={clsx(styles.forTitle, {
                    [styles.darkInput]: theme === 'dark',
                    [styles.inputError]: error === true,
                  })}
                  placeholder="Title"
                  value={titleInput}
                  onChange={handleChangeTitle}
                  aria-label="Title input"
                />
                {error && <p className={styles.error}>{error}</p>}
              </div>
              <button
                className={clsx(styles.addButton, {
                  [styles.addButtonViolet]: theme === 'violet',
                })}
              >
                <div
                  className={clsx(styles.blackBox, {
                    [styles.blackBoxViolet]: theme === 'violet',
                  })}
                >
                  <svg className={styles.icon} width="14px" height="14px">
                    <use
                      xlinkHref={`${LogoSprite}#icon-plus`}
                      className={clsx(styles.plusIcon, {
                        [styles.plusIconViolet]: theme === 'violet',
                      })}
                    />
                  </svg>
                </div>
                <span
                  className={clsx(styles.span, {
                    [styles.addTextButton]: theme === 'violet',
                  })}
                >
                  Add
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MdlColumn;
