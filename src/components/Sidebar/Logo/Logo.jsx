import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';

import styles from './Logo.module.scss';

const Logo = () => {
  const { theme } = useAuth();

  return (
    <div
      className={clsx(styles.sidebar_logo, {
        [styles.sidebar_logoDark]: theme === 'dark',
        [styles.sidebar_logoLight]: theme === 'light',
        [styles.sidebar_logoViolet]: theme === 'violet',
      })}
    >
      <div className={styles.logo_ico_con}>
        <svg className={styles.logo_ico} width="12" height="16">
          <use xlinkHref={`${LogoSprite}#icon-lightning1`}></use>
        </svg>
      </div>
      <div>
        <p className={styles.sidebar_logo_title}>Task Pro</p>
      </div>
    </div>
  );
};

export default Logo;
