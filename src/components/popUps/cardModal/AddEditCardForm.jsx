import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './addEditCardForm.module.scss';
import clsx from 'clsx';
import { dbDate } from '../../../helpers/isToday';
import { useAuth } from '../../../hooks';
import { addCard } from '../../../redux/tasks/cards/cardsOperations';

import ModalButton from '../ModalButton/ModalButton';

import InputForm from '../Board/InputForm/InputForm';
import { CalendarNew } from '../../MainScreen/Card/Calendar/CalendarNew';

const initialValues = {
  title: '',
  description: '',
  priority: '',
  deadline: dbDate(new Date()),
};

const options = [
  { priority: 'without' },
  { priority: 'low' },
  { priority: 'medium' },
  { priority: 'high' },
];

const AddEditCardForm = ({
  cardData = initialValues,
  action = 'Create',
  columnId = null,
  func,
}) => {
  const dispatch = useDispatch();

  const { theme } = useAuth();
  const [card, setCard] = useState({ ...cardData, columnId: columnId });
  console.log(card);

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
      deadline: date,
    });
    console.log('Selected date:', date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (card.title === '') {
      dispatch(addCard({ ...card }));
    } else {
      try {
        if (action === 'Create') {
          console.log(card);
          console.log('Saved');
          dispatch(addCard({ ...card }));
        } else {
          console.log('Updated');
        }
        reset();
        func(false);
      } catch (error) {
        console.error('Error saving form data:', error);
      }
      reset();
      func(false);
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
          [css.colorFilterWithoutPriority]: option.priority === 'without',
          [css.colorFilterLowPriority]: option.priority === 'low',
          [css.colorFilterMediumPriority]: option.priority === 'medium',
          [css.colorFilterHighPriority]: option.priority === 'high',
        })}
      >
        <span
          className={clsx(css.colorFilterCenter, {
            [css.colorFilterCenterWithoutPriority]:
              option.priority === 'without',
            [css.colorFilterCenterLowPriority]: option.priority === 'low',
            [css.colorFilterCenterMediumPriority]: option.priority === 'medium',
            [css.colorFilterCenterHighPriority]: option.priority === 'high',
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
            [css.forCommentDark]: theme === 'dark',
            [css.forCommentlLight]: theme === 'light',
            [css.forCommentViolet]: theme === 'violet',
          })}
          onChange={handleChange}
          value={description}
          placeholder="Description"
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
