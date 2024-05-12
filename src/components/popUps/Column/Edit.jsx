import { useState } from 'react';
import styles from './Column.module.scss';
import validationTitle from '../../../schemas/validationTitle';
import clsx from 'clsx';

import LogoSprite from '../../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import useClickOnBackdropToCloseModals from '../../../hooks/closeByClick';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';
import { editColumnOperation } from '../../../redux/tasks/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks';

const MdlEdit = ({ open, onOpen, onClose, item }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(item.title);
  const [error, setError] = useState('');

  const handleCloseModal = () => {
    onClose();
    setError('');
  };

  useClickOnBackdropToCloseModals(onClose);
  useEscapeKeyToCloseModals(onClose);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleChangeTitle = (e) => {
    console.log(e.target);

    setTitleInput(e.target.value);
    console.log(titleInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = validationTitle;

    schema
      .validate({ title: titleInput })
      .then((data) => {
        console.log('data', data);
        handleCloseModal();
        dispatch(
          editColumnOperation({ columnId: item._id, body: { ...data } })
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <button onClick={handleOpenModal}>Edit Modal</button>
      {open && (
        <div className={styles.modal} data-id="modal-backdrop">
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
                Edit column
              </h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.title}>
                <input
                  type="text"
                  className={clsx(styles.forTitle, {
                    [styles.darkInput]: theme === 'dark',
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

export default MdlEdit;
