import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './addEditCardForm.module.scss';
import clsx from 'clsx';
import { dbDate } from '../../../helpers/isToday';
import { useAuth } from '../../../hooks';
import {
  addCardOperation,
  editCardOperation,
} from '../../../redux/tasks/cards/cardsOperations';

import ModalButton from '../ModalButton/ModalButton';

import { CalendarNew } from '../../MainScreen/Card/Calendar/CalendarNew';

const options = [
  { priority: 'without' },
  { priority: 'low' },
  { priority: 'medium' },
  { priority: 'high' },
];

const initialValues = {
  title: '',
  description: '',
  priority: 'without',
  deadline: dbDate(new Date()),
};

const AddEditCardForm = ({
  cardData = initialValues,
  action = 'Create',
  columnId = null,
  func,
}) => {
  const dispatch = useDispatch();

  const { theme } = useAuth();
  const [card, setCard] = useState({ ...cardData });
  const [error, setError] = useState(false);

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
  };

  const { title, description, deadline, priority } = card;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '' || description === '') {
      setError(true);
      return;
    }
    if (action === 'Create') {
      dispatch(addCardOperation({ ...card, columnId }));
      reset();
      func(false);
    } else if (action === 'Edit') {
      dispatch(
        editCardOperation({
          cardId: cardData._id,
          body: { title, description, priority, deadline },
        })
      );
      func(false);
    }
  };

  const reset = () => {
    setCard({ ...initialValues });
  };

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
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={card.title}
          onChange={handleChange}
          className={clsx(
            css.forTitle,
            {
              [css.forTitleDark]: theme === 'dark',
              [css.forTitleLight]: theme === 'light',
              [css.forTitleViolet]: theme === 'violet',
            },
            `${card.title.length > 0 && css.active}`
          )}
        />
        {error && <p className={css.error}>{'Title is required'}</p>}
      </div>
      <div className={css.comment}>
        <textarea
          type="text"
          name="description"
          className={clsx(
            css.forDescription,
            {
              [css.forDescriptionDark]: theme === 'dark',
              [css.forDescriptionLight]: theme === 'light',
              [css.forDescriptionViolet]: theme === 'violet',
            },
            `${card.description.length > 0 && css.active}`
          )}
          onChange={handleChange}
          value={card.description}
          placeholder="Description"
        />
        {error && <p className={css.error}>{'Description is required'}</p>}
      </div>

      <div className={css.filterOptions}>
        <p className={css.lableColor}>Lable color</p>
        <div className={css.filterForm}>{elements}</div>
      </div>

      <CalendarNew value={deadline} onChange={handleCalendarChange} />
      <ModalButton type="submit" text={action === 'Create' ? 'Add' : 'Edit'} />
    </form>
  );
};

export default AddEditCardForm;
