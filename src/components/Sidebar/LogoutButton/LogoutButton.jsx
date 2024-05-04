import React from 'react';
import css from '../LogoutButton/LogoutButton.scss';

const LogoutButton = () => {
  return (
    <section className={css.logoutButton}>
      <button className={css.button} type="button">
        Log out
      </button>
    </section>
  );
};

export default LogoutButton;
