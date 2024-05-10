
import React, { useState, useEffect } from 'react';
import styles from './Column.module.scss';
import validationTitle from '../../../schemas/validationTitle';
import clsx from 'clsx';

import LogoSprite from '../../../assets/sprite.svg';

const MdlColumn = () => {
  const theme = 'Dark';

  const [isOpen, setIsOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [error, setError] = useState('');

  const handleCloseModal = () => {
    setIsOpen(false);
    setTitleInput('');
    setError('');
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = validationTitle;

    schema
      .validate({ title: titleInput })
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <button onClick={handleOpenModal}>Open Add</button>
      {isOpen && (
        <div className={styles.modal}>
          <div
            className={clsx(styles.modalContent, {
              [styles.dark]: theme === 'Dark',
              [styles.light]: theme === 'Light',
              [styles.violet]: theme === 'Violet',
            })}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg className={styles.iconBtn} width="18px" height="18px">
                <use
                  xlinkHref={`${LogoSprite}#icon-x-close`}
                  className={clsx(styles.closeIcon, {
                    [styles.lightCloseButton]: theme === 'Light',
                    [styles.violetCloseButton]: theme === 'Violet',
                  })}
                />
              </svg>
            </button>
            <div className={styles.titleContainer}>
              <h1
                className={clsx(styles.mainTitle, {
                  [styles.titleDark]: theme === 'Dark',
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
                    [styles.darkInput]: theme === 'Dark',
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
                  [styles.addButtonViolet]: theme === 'Violet',
                })}
              >
                <div
                  className={clsx(styles.blackBox, {
                    [styles.blackBoxViolet]: theme === 'Violet',
                  })}
                >
                  <svg className={styles.icon} width="14px" height="14px">
                    <use
                      xlinkHref={`${LogoSprite}#icon-plus`}
                      className={clsx(styles.plusIcon, {
                        [styles.plusIconViolet]: theme === 'Violet',
                      })}
                    />
                  </svg>
                </div>
                <span
                  className={clsx(styles.span, {
                    [styles.addTextButton]: theme === 'Violet',
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
