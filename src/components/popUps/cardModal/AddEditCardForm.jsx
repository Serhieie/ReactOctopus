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

const AddEditCardForm = (
  cardData = initialValues,
  columnId = null,
  columnOwner = null
) => {
  const [card, setCard] = useState({ ...cardData });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: card,
  });

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
          columnId: cardData.owner,
          boardId: columnOwner,
          body: { ...card },
        })
      );
    }
    dispatch(addCard({ boardId: columnOwner, columnId, body: { ...card } }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register(card.title, { required: true })}
        placeholder="Title"
      />
      {errors.card.title && <p className={s.error}>{errors.email.message}</p>}
      <textarea
        {...register(card.description, { required: true })}
        placeholder="Description"
      ></textarea>
      <label>
        <p>Label color</p>
        <input
          type="radio"
          {...register(card.priority)}
          value={'low'}
          checked={card.priority === 'low'}
          onChange={handleChange}
        />
        <input
          type="radio"
          {...register(card.priority)}
          value={'medium'}
          checked={card.priority === 'medium'}
          onChange={handleChange}
        />
        <input
          type="radio"
          {...register(card.priority)}
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
