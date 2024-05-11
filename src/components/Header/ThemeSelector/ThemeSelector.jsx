import styles from './ThemeSelector.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { PopUp } from './PopUp/PopUp';
import { useAuth } from '../../../hooks';
import { useIsPopUpOpen } from '../../../hooks/useIsPopUpOpen';
import { useDispatch } from 'react-redux';
import { setIsChangeThemePopUpOpen } from '../../../redux/popUps/popUpsSlice';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';

export const ThemeSelector = () => {
  const { isChangeThemePopUpOpen } = useIsPopUpOpen();
  const dispatch = useDispatch();
  const { theme } = useAuth();

  useEscapeKeyToCloseModals();

  const toggleOpenTheme = async () => {
    isChangeThemePopUpOpen
      ? dispatch(setIsChangeThemePopUpOpen(false))
      : dispatch(setIsChangeThemePopUpOpen(true));
  };

  return (
    <div onClick={toggleOpenTheme} className={clsx(styles.openTheme)}>
      <span
        className={clsx(styles.openThemeSpan, {
          [styles.openThemeSpanDark]: theme === 'dark',
          [styles.openThemeSpanLight]: theme === 'light',
          [styles.openThemeSpanViolet]: theme === 'violet',
        })}
      >
        Theme{' '}
        <svg
          className={clsx(styles.arrowIcon, {
            [styles.rotate]: isChangeThemePopUpOpen,
          })}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <use xlinkHref={`${sprite}#icon-chevron-down`} />
        </svg>
      </span>
      <PopUp isThemeOpen={isChangeThemePopUpOpen} />
    </div>
  );
};
