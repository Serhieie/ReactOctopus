import React from 'react';
import styles from './NeedHelp.module.scss';
import UserImg from '../../../assets/plant/plantX1.png';
// import questionSprite from '../../../assets/sprite.svg';

const NeedHelp = () => {
  return (
    <section className={styles.needHelp}>
      <img className={styles.img} src={UserImg} alt="cute cactus" />
      <p className={styles.infoText}>
        If you need help with <span className={styles.specText}>TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>
      <button className={styles.button} type="button">
        Need help?
      </button>
    </section>
  );
};

export default NeedHelp;
