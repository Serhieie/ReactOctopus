import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import UserImg from '../../assets/login/loginX1.png';
import LogoSprite from '../../assets/sprite.svg';
import styles from './Welcome.module.scss';

const Welcome = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  const handleLoginHover = () => {
    setIsLoginHovered(true);
  };

  const handleLoginLeave = () => {
    setIsLoginHovered(false);
  };

  return (
    <section className={styles.container}>
      <img className={styles.userImg} src={UserImg} alt="boy with computer" />

      <div className={styles.logoWrap}>
        <div className={styles.logo}>
          <svg className={styles.icon}>
            <use
              xlinkHref={`${LogoSprite}#icon-lightning`}
              className={styles.iconLightning}
              style={{ width: '15px', height: '20px' }}
            />
          </svg>
        </div>
        <h1>Task Pro</h1>
      </div>

      <p className={styles.text}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>

      <div className={styles.linksWrap}>
        <NavLink
          to="auth/register"
          className={
            isLoginHovered ? styles.registerOnLoginHover : styles.register
          }
        >
          Registration
        </NavLink>
        <NavLink
          to="auth/login"
          className={styles.login}
          onMouseEnter={handleLoginHover}
          onMouseLeave={handleLoginLeave}
        >
          Log In
        </NavLink>
      </div>
    </section>
  );
};

export default Welcome;
