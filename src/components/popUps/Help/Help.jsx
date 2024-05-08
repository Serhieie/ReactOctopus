import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Help.module.scss';
import { setIsHelpPopUpOpen } from '../../../redux/popUps/popUpsSlice';
import validationFormHelp from '../../../schemas/validationFormHelp';
import { useIsPopUpOpen } from '../../../hooks/useIsPopUpOpen';
import { useDispatch } from 'react-redux';

const HelpModal = () => {
  const dispatch = useDispatch();
  const { isHelpPopUpOpen } = useIsPopUpOpen();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationFormHelp),
  });

  const handleCloseModal = () => {
    dispatch(setIsHelpPopUpOpen(false));
  };

  const onSubmit = () => {
    console.log('Success');
  };

  return (
    <>
      {isHelpPopUpOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={handleCloseModal}
            ></button>
            <div className={styles.titleContainer}>
              <h1 className={styles.mainTitle}>Need help</h1>
            </div>
            <form
              className={styles.form}
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
                handleCloseModal();
              })}
            >
              <div className={styles.email}>
                <input
                  type="email"
                  className={styles.forEmail}
                  {...register('email', { required: true })}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>
              <div className={styles.comment}>
                <textarea
                  type="text"
                  className={styles.forComment}
                  {...register('comment', { required: true })}
                  placeholder="Comment"
                />
                {errors.comment && (
                  <p className={styles.error}>{errors.comment.message}</p>
                )}
              </div>
              <button className={styles.button} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;
