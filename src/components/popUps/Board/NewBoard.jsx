import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';

import Icons from '../../../assets/sprite.svg';
import ColumnForm from './ColumnForm/ColumnForm';

import CloseModalButton from './CloseModalButton/CloseModalButton';

const NewBoard = ({ name }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.columnsModal}>
        <CloseModalButton />
        <p className={css.modalTitle}>{name}</p>
        <ColumnForm />
      </div>
    </div>
  );
};

export default NewBoard;
