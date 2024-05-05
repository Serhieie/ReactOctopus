import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar'
import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      {/* <Sidebar /> */}
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
