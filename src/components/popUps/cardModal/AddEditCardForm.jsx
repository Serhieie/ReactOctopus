import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './addEditCardForm.module.scss';
import clsx from 'clsx';
import {
  editeCard,
  addCard,
} from '../../../redux/tasks/operations/cardsOperations';
import s from './addEditCardForm.module.scss';
import ModalButton from '../ModalButton/ModalButton';
import InputForm from '../Board/InputForm/InputForm';

import DatePickerCustom from './DatePickerCustom';
const initialValues = {
  title: '',
  description: '',
  priority: '',
};

const AddEditCardForm = ({
  cardData = initialValues,
  columnId = null,
  changeFilter,
}) => {
  const theme = 'dark';
  const [filter, setFilter] = useState('');
  const [card, setCard] = useState({ ...cardData });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: card,
  });

  console.log(card);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (columnId === null) {
      dispatch(
        editeCard({
          cardId: card._id,
          body: { ...card },
        })
      );
    }
    dispatch(addCard({ columnId, body: { ...card } }));
  };

  const options = [
    { priority: 'Without priority' },
    { priority: 'Low' },
    { priority: 'Medium' },
    { priority: 'High' },
  ];

  const elements = options.map((option, index) => (
    <label key={index} className={css.colorFilterRadioLable}>
      <input
        onChange={changeFilter}
        className={css.radioIcon}
        type="radio"
        name="priority"
        value={option.priority}
        checked={filter === option.priority}
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
      {/* <p className={css.priorityText}>{option.priority}</p> */}
    </label>
  ));

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <div className={css.inputWrapper}>
        <InputForm />
      </div>
      {/* {errors.card.title && <p className={s.error}>{errors.email.message}</p>} */}
      <div className={css.comment}>
        <textarea
          type="text"
          name="message"
          className={clsx(css.forComment, {
            [css.darkInp]: theme === 'Dark',
          })}
          {...register('comment', { required: true })}
          placeholder="Comment"
        />
        {errors.comment && (
          <p className={css.error}>{errors.comment.message}</p>
        )}
      </div>

      <div className={css.filterOptions}>
        <p className={css.lableColor}>Lable color</p>
        <div className={css.filterForm}>{elements}</div>
      </div>
      <DatePickerCustom />
      <ModalButton type="submit" />
    </form>
  );
};

export default AddEditCardForm;
{
  // <input
  //   type="text"
  //   name="tite"
  //   {...register('title', { required: true })}
  //   placeholder="Title"
  // />;
  /* <div className={styles.comment}>
  
    <textarea
        name="description"
        {...register('description', { required: true })}
        placeholder="Description"
      ></textarea>
  {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}
</div>; */
}
//  <label>
//    <p>Label color</p>
//    <input
//      type="radio"
//      name="priority"
//      {...register('priority', { required: true })}
//      value={'low'}
//      checked={card.priority === 'low'}
//      onChange={handleChange}
//    />
//    <input
//      type="radio"
//      name="priority"
//      {...register('priority', { required: true })}
//      value={'medium'}
//      checked={card.priority === 'medium'}
//      onChange={handleChange}
//    />
//    <input
//      type="radio"
//      name="priority"
//      {...register('priority', { required: true })}
//      value={'high'}
//      checked={card.priority === 'high'}
//      onChange={handleChange}
//    />
//  </label>;
