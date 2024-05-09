import styles from './NeedHelp.module.scss';
import UserImg from '../../../assets/plant/plantX1.png';
import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import HelpModal from '../../popUps/Help/Help';
import { useDispatch } from 'react-redux';
import { setIsHelpPopUpOpen } from '../../../redux/popUps/popUpsSlice';

const NeedHelp = ({ theme }) => {
  const dispatch = useDispatch();

  const openNeedHelpModal = () => {
    dispatch(setIsHelpPopUpOpen(true));
  };

  return (
    <div
      className={clsx(styles.needHelp, {
        [styles.needHelpDark]: theme === 'dark',
        [styles.needHelpLight]: theme === 'light',
        [styles.needHelpViolet]: theme === 'violet',
      })}
    >
      <img className={styles.img} src={UserImg} alt="cute cactus" />
      <p className={styles.infoText}>
        If you need help with <span className={styles.specText}>TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>
      <button
        onClick={openNeedHelpModal}
        className={styles.button}
        type="button"
      >
        <svg className={styles.icon}>
          <use
            xlinkHref={`${LogoSprite}#icon-help-circle`}
            className={styles.iconLightning}
          />
        </svg>
        Need help?
      </button>
      <HelpModal />
    </div>
  );
};

export default NeedHelp;
