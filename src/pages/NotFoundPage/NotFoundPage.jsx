import React from 'react';
import Button from '@mui/material/Button';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://i.imgur.com/Q2BAOd2.png"
        alt=""
        className={styles.img}
      />
      <p className={styles.title}>This Page is Not on the Map</p>
      <Button component={Link} to="/home" variant="outlined">
        Get back to home page
      </Button>
    </div>
  );
};
export default NotFoundPage;
