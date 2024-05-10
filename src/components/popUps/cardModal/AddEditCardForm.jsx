import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  editeCard,
  addCard,
} from '../../../redux/tasks/operations/cardsOperations';
import s from './addEditCardForm.module.scss';
import ModalButton from '../ModalButton/ModalButton';

const initialValues = {
  title: '',
  description: '',
  priority: '',
};

const AddEditCardForm = ({ cardData = initialValues, columnId = null }) => {
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
  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <input
        type="text"
        name="tite"
        {...register('title', { required: true })}
        placeholder="Title"
      />
      {errors.card.title && <p className={s.error}>{errors.email.message}</p>}
      <textarea
        name="description"
        {...register('description', { required: true })}
        placeholder="Description"
      ></textarea>
      <label>
        <p>Label color</p>
        <input
          type="radio"
          name="priority"
          {...register('priority', { required: true })}
          value={'low'}
          checked={card.priority === 'low'}
          onChange={handleChange}
        />
        <input
          type="radio"
          name="priority"
          {...register('priority', { required: true })}
          value={'medium'}
          checked={card.priority === 'medium'}
          onChange={handleChange}
        />
        <input
          type="radio"
          name="priority"
          {...register('priority', { required: true })}
          value={'high'}
          checked={card.priority === 'high'}
          onChange={handleChange}
        />
      </label>
      <ModalButton type="submit" />
    </form>
  );
};

export default AddEditCardForm;
