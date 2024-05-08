import React from 'react';
import styles from './NeedHelp.module.scss';
import UserImg from '../../../assets/plant/plantX1.png';
import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

const NeedHelp = ({ theme }) => {
  return (
    <section
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
      <button className={styles.button} type="button">
        <svg className={styles.icon}>
          <use
            xlinkHref={`${LogoSprite}#icon-help-circle`}
            className={styles.iconLightning}
          />
        </svg>
        Need help?
      </button>
    </section>
  );
};

export default NeedHelp;
