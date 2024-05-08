import css from './InputForm.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

const InputForm = ({ onChange, value = '', name = 'title' }) => {
  const theme = useSelector(selectUserTheme);

  const titleId = nanoid();

  return (
    <label htmlFor={titleId}>
      <input
        onChange={onChange}
        className={`${clsx(css.modalInput, {
          [css.modalInputDark]: theme === 'dark',
          [css.modalInputLight]: theme === 'light',
          [css.modalInputViolet]: theme === 'violet',
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
