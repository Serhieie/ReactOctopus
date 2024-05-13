import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Help.module.scss';
import { setIsHelpPopUpOpen } from '../../../redux/popUps/popUpsSlice';
import validationFormHelp from '../../../schemas/validationFormHelp';
import { useIsPopUpOpen } from '../../../hooks/useIsPopUpOpen';
import { useDispatch } from 'react-redux';
import { needHelpOperation } from '../../../redux/auth/authOperations';
import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import useClickOnBackdropToCloseModals from '../../../hooks/closeByClick';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';
import { useAuth } from '../../../hooks';

const HelpModal = () => {
  const { theme } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationFormHelp),
  });

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setIsHelpPopUpOpen(false));
  };

  const { isHelpPopUpOpen } = useIsPopUpOpen();

  useClickOnBackdropToCloseModals();
  useEscapeKeyToCloseModals();

  const onSubmit = (data) => {
    dispatch(needHelpOperation(data));
  };

  return (
    <>
      {isHelpPopUpOpen && (
        <div
          data-id="modal-backdrop"
          className={clsx(styles.modal, {
            [styles.modalDark]: theme === 'dark',
            [styles.modalLight]: theme === 'light',
            [styles.modalViolet]: theme === 'violet',
          })}
        >
          <div
            className={clsx(styles.modalContent, {
              [styles.dark]: theme === 'dark',
              [styles.light]: theme === 'light',
              [styles.violet]: theme === 'violet',
            })}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg className={styles.iconBtn} width="18px" height="18px">
                <use
                  xlinkHref={`${LogoSprite}#icon-x-close`}
                  className={clsx(styles.closeIcon, {
                    [styles.lightCloseButton]: theme === 'light',
                    [styles.violetCloseButton]: theme === 'violet',
                  })}
                />
              </svg>
            </button>
            <div className={styles.titleContainer}>
              <h1
                className={clsx(styles.mainTitle, {
                  [styles.titleDark]: theme === 'dark',
                })}
              >
                Need help
              </h1>
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
                  name="email"
                  className={clsx(styles.forEmail, {
                    [styles.darkInput]: theme === 'dark',
                  })}
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
                  name="message"
                  className={clsx(styles.forComment, {
                    [styles.darkInp]: theme === 'dark',
                  })}
                  {...register('comment', { required: true })}
                  placeholder="Comment"
                />
                {errors.comment && (
                  <p className={styles.error}>{errors.comment.message}</p>
                )}
              </div>
              <button
                className={clsx(styles.button, {
                  [styles.addButtonViolet]: theme === 'violet',
                })}
                type="submit"
              >
                <span
                  className={clsx(styles.span, {
                    [styles.addTextButton]: theme === 'violet',
                  })}
                >
                  Add
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;
