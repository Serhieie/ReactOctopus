import css from './InputForm.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

const InputForm = ({ onChange, value = '', name = 'title' }) => {
  const theme = 'Dark';

  const titleId = nanoid();

  return (
    <label htmlFor={titleId}>
      <input
        onChange={onChange}
        className={`${clsx(css.modalInput, {
          [css.modalInputDark]: theme === 'Dark',
          [css.modalInputLight]: theme === 'Light',
          [css.modalInputViolet]: theme === 'Violet',
        })} ${value.length !== 0 ? css.active : ''}`}
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
