import styles from './Calendar.module.scss';
import sprite from '../../../../assets/sprite.svg';
import clsx from 'clsx';
import { useAuth } from '../../../../hooks';
import { useState } from 'react';
import { dbDate, toodayDate } from '../../../../helpers/isToday';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/purple.css';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/colors/green.css';

export const CalendarNew = ({ cardDeadline, onChange }) => {
  const { theme } = useAuth();
  const [value, setValue] = useState(cardDeadline);

  const getDefaultBackground = (theme) => {
    switch (theme) {
      case 'dark':
        return 'bg-dark';
      case 'light':
        return 'green';
      case 'violet':
      default:
        return 'purple';
    }
  };

  const handleChange = (date, { isTyping }) => {
    if (!isTyping) {
      onChange(dbDate(date));

      return setValue(date);
    }
    const currentDate = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    if (selectedDate < currentDate) {
      return false;
    }
    setValue(date);
  };

  // const handleSubmit = () => {
  //     if (value ) value = value.toDate();
  //     submitDate(value);
  // }
  //<button type="submit" onClick={handleSubmit}>submit</button>

  const color = getDefaultBackground(theme);

  return (
    <div className={styles.container}>
      <span
        className={clsx(styles.textDeadline, {
          [styles.textDeadlineDark]: theme === 'dark',
          [styles.textDeadlineLight]: theme === 'light',
          [styles.textDeadlineViolet]: theme === 'violet',
        })}
      >
        Deadline
      </span>
      <DatePicker
        value={value}
        minDate={new Date()}
        className={`${color}`}
        onChange={handleChange}
        style={{
          border: 'none',
          boxShadow: 'none',
        }}
        render={
          <button type="button">
            <span
              className={clsx(styles.openThemeSpan, {
                [styles.openThemeSpanDark]: theme === 'dark',
                [styles.openThemeSpanLight]: theme === 'light',
                [styles.openThemeSpanViolet]: theme === 'violet',
              })}
            >
              {toodayDate(value)}
              <svg
                className={clsx(styles.arrowIcon, {
                  [styles.rotate]: value, // тут нада поставить буллиант что календарь открыт или закрыт
                })}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
              >
                <use xlinkHref={`${sprite}#icon-chevron-down`} />
              </svg>
            </span>
          </button>
        }
      />
    </div>
  );
};
