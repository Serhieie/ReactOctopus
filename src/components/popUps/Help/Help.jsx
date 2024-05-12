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

const HelpModal = () => {
  const theme = 'Violet';
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
        <div data-id="modal-backdrop" className={styles.modal}>
          <div
            className={clsx(styles.modalContent, {
              [styles.dark]: theme === 'Dark',
              [styles.light]: theme === 'Light',
              [styles.violet]: theme === 'Violet',
            })}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg className={styles.iconBtn} width="18px" height="18px">
                <use
                  xlinkHref={`${LogoSprite}#icon-x-close`}
                  className={clsx(styles.closeIcon, {
                    [styles.lightCloseButton]: theme === 'Light',
                    [styles.violetCloseButton]: theme === 'Violet',
                  })}
                />
              </svg>
            </button>
            <div className={styles.titleContainer}>
              <h1
                className={clsx(styles.mainTitle, {
                  [styles.titleDark]: theme === 'Dark',
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
                    [styles.darkInput]: theme === 'Dark',
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
                    [styles.darkInp]: theme === 'Dark',
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
                  [styles.addButtonViolet]: theme === 'Violet',
                })}
                type="submit"
              >
                <span
                  className={clsx(styles.span, {
                    [styles.addTextButton]: theme === 'Violet',
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
