import css from './InputForm.module.scss';
import { nanoid } from '@reduxjs/toolkit';

const InputForm = ({ onChange, value = '', name = 'title' }) => {
  const titleId = nanoid();

  return (
    <label htmlFor={titleId}>
      <input
        onChange={onChange}
        className={`${css.modalInput} ${value.length !== 0 ? css.active : ''}`}
        type="text"
        name={name}
        id={titleId}
        placeholder="Title"
        value={value}
      />
    </label>
  );
};

export default InputForm;
