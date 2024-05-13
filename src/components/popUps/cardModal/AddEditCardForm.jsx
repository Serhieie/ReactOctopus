import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './addEditCardForm.module.scss';
import clsx from 'clsx';
import { dbDate } from '../../../helpers/isToday';

import s from './addEditCardForm.module.scss';
s;
import ModalButton from '../ModalButton/ModalButton';

import InputForm from '../Board/InputForm/InputForm';
import { CalendarNew } from '../../MainScreen/Card/Calendar/CalendarNew';

const initialValues = {
  title: '',
  description: '',
  priority: '',
  date: dbDate(new Date()),
};

const options = [
  { priority: 'Without priority' },
  { priority: 'Low' },
  { priority: 'Medium' },
  { priority: 'High' },
];

const AddEditCardForm = ({ cardData = initialValues, action = 'Create' }) => {
  const dispatch = useDispatch();

  const theme = 'dark';
  const [card, setCard] = useState({ ...cardData });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleCalendarChange = (date) => {
    setCard({
      ...card,
      date,
    });
    console.log('Selected date:', date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (card.title === '') {
      console.log(123);
    } else {
      try {
        if (action === 'Create') {
          console.log(card);
          console.log('Saved');
        } else {
          console.log('Updated');
        }
        reset();
      } catch (error) {
        console.error('Error saving form data:', error);
      }
      reset();
    }
  };

  const reset = () => {
    setCard({ ...initialValues });
  };

  const { title, description, priority, date } = card;

  const elements = options.map((option, index) => (
    <label key={index} className={css.colorFilterRadioLable}>
      <input
        onChange={handleChange}
        className={css.radioIcon}
        type="radio"
        name="priority"
        value={option.priority}
        checked={priority === option.priority}
      />
      <span
        className={clsx(css.colorFilter, {
          [css.colorFilterWithoutPriority]:
            option.priority === 'Without priority',
          [css.colorFilterLowPriority]: option.priority === 'Low',
          [css.colorFilterMediumPriority]: option.priority === 'Medium',
          [css.colorFilterHighPriority]: option.priority === 'High',
        })}
      >
        <span
          className={clsx(css.colorFilterCenter, {
            [css.colorFilterCenterWithoutPriority]:
              option.priority === 'Without priority',
            [css.colorFilterCenterLowPriority]: option.priority === 'Low',
            [css.colorFilterCenterMediumPriority]: option.priority === 'Medium',
            [css.colorFilterCenterHighPriority]: option.priority === 'High',
          })}
        ></span>
      </span>
    </label>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <InputForm value={title} onChange={handleChange} />
      </div>

      <div className={css.comment}>
        <textarea
          type="text"
          name="description"
          className={clsx(css.forComment, {
            [css.darkInp]: theme === 'Dark',
          })}
          onChange={handleChange}
          value={description}
          placeholder="Comment"
        />
      </div>

      <div className={css.filterOptions}>
        <p className={css.lableColor}>Lable color</p>
        <div className={css.filterForm}>{elements}</div>
      </div>

      <CalendarNew value={date} onChange={handleCalendarChange} />
      <ModalButton type="submit" />
    </form>
  );
};

export default AddEditCardForm;
