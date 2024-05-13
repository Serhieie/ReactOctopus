import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './addEditCardForm.module.scss';
import clsx from 'clsx';
import { dbDate } from '../../../helpers/isToday';
import { useAuth } from '../../../hooks';
import {
  addCard,
  editCardOperation,
} from '../../../redux/tasks/cards/cardsOperations';

import ModalButton from '../ModalButton/ModalButton';

import InputForm from '../Board/InputForm/InputForm';
import { CalendarNew } from '../../MainScreen/Card/Calendar/CalendarNew';
import { validationCardSchema } from '../../../schemas/validationCard';

const initialValues = {
  title: '',
  description: '',
  priority: 'without',
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
      deadline: date,
    });
    console.log('Selected date:', date);
  };

  const { title, description, deadline, priority } = card;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === 'Create') {
      dispatch(addCard({ ...card, columnId }));
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

  // const {
  //   register,
  //   formState: { errors },
  //   setValue,
  // } = useForm({
  //   resolver: yupResolver(validationCardSchema),
  // });

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
        <InputForm
          value={title}
          onChange={handleChange}
          // {...register('title', { required: true })}
        />
        {/* <input
          type="text"
          name="title"
          value={card.title}
          onChange={handleChange}
          {...register('title', { required: true })}
        />
        {errors.title && <p className={css.error}>{errors.title.message}</p>} */}
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
          value={card.description}
          placeholder="Description"
          // {...register('description', { required: true })}
        />
        {/* {errors.description && (
          <p className={css.error}>{errors.description.message}</p>
        )} */}
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
