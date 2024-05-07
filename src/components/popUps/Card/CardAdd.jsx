import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ButtonClose } from '';
import { Calendar } from '';
import sprite from './icon-plus.svg';
import { addTask } from '../../../redux/tasks/tasksOperations';
import styles from './Card.module.scss';

const initialValues = {
  title: '',
  description: '',
  priority: 'without',
};

export const AddCardForm = ({ columnId, onClose }) => {
  const [deadline, setDeadline] = useState();
  const dispatch = useDispatch();

  const setDateValue = (value) => {
    setDeadline(value);
  };

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const formatDate = (param) => {
    let a = moment(param);
    const deadline = a.format('DD-MM-YYYY');
    return deadline;
  };

  const determineTodayTomorrow = (date) => {
    const d = moment(date);
    const today = moment().endOf('day');
    const tomorrow = moment().add(1, 'day').endOf('day');
    if (d < today) return 'Today';
    if (d < tomorrow) return 'Tomorrow';
    return 'in ' + d.fromNow(true);
  };

  const displayDeadline = (date) => {
    let printDeadline = 'Today, ' + moment().format('MMMM D');
    if (date) {
      if (date.diff(moment()) < 0) {
        Notify.failure('Select a date after now');
      }
      if (deadline) {
        printDeadline =
          determineTodayTomorrow(deadline.$d) +
          ', ' +
          moment(deadline.$d).format('MMMM D');
        return printDeadline;
      } else {
        printDeadline = 'Today, ' + moment().format('MMMM D');
      }
      return printDeadline;
    }
    return printDeadline;
  };

  const handleSubmit = (values, actions) => {
    values = {
      ...values,
      deadline: formatDate(deadline.$d),
      parentColumn: columnId,
    };
    actions.resetForm();
    dispatch(addTask(values));
    onClose();
  };

  return (
    <div className={styles.cardForm}>
      <ButtonClose onClose={onClose} />
      <h1 className={styles.titleForm}>Add card</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <Field
              className={styles.inputTitle}
              type="text"
              name="title"
              placeholder="Title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.errorMessage}
            />
            <Field
              className={styles.inputDescription}
              type="text"
              name="description"
              placeholder="Description"
              as="textarea"
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.errorMessage}
            />
            <h2 className={styles.titleStatus} id="taskStatusGroup">
              Label color
            </h2>
            <div
              className={styles.blockStatus}
              role="group"
              aria-labelledby="taskStatusGroup"
            >
              <label>
                <Field type="radio" name="priority" value="low" />
                <div
                  className={styles.colorStatus}
                  style={{ backgroundColor: '#8FA1D0' }}
                ></div>
              </label>
              <label>
                <Field type="radio" name="priority" value="medium" />
                <div
                  className={styles.colorStatus}
                  style={{ backgroundColor: '#E09CB5' }}
                ></div>
              </label>
              <label>
                <Field type="radio" name="priority" value="high" />
                <div
                  className={styles.colorStatus}
                  style={{ backgroundColor: '#BEDBB0' }}
                ></div>
              </label>
              <label>
                <Field type="radio" name="priority" value="without" />
                <div
                  className={styles.colorStatus}
                  style={{ backgroundColor: '#FFFFFF4D' }}
                ></div>
              </label>
            </div>
            <p className={styles.titleDeadline}>Deadline</p>
            <div className={styles.calendarShow}>
              <div>{displayDeadline(deadline)}</div>
              <Calendar parentState={setDateValue} />
            </div>
            <button type="submit" className={styles.submitButton}>
              <svg className={styles.iconPlus} aria-label="add">
                <use href={sprite + '#icon-plus-add'}></use>
              </svg>
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
