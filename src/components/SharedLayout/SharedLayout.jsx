import { Outlet } from 'react-router-dom';
import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
