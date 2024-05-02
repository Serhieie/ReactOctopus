import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(id === 'login' ? 1 : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <div>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: { display: 'none' }}}>
          <Tab className={styles.registrLink}  label="Registration" component={NavLink} to="/auth/register" />
          <Tab className={styles.loginLink}  label="Log In" component={NavLink} to="/auth/login" />
        </Tabs>
        {value === 0 && <RegisterForm />}
        {value === 1 && <LoginForm />}
      </div>
    </div>
  );
};

export default AuthPage;