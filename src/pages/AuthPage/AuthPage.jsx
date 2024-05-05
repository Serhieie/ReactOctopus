import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

import styles from './AuthPage.module.scss';
import { useDispatch } from 'react-redux';
import { signUp, logIn } from '../../redux/auth/authOperations';

const AuthPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(id === 'login' ? 1 : 0);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onRegister = (data) => {
    dispatch(signUp(data));
  };

  const onLogin = (data) => {
    dispatch(logIn(data));
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.container}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab
            className={styles.registrLink}
            label="Registration"
            component={NavLink}
            to="/auth/register"
            style={{
              color:
                value === 0 ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
              padding: 0,
            }}
          />
          <Tab
            className={styles.loginLink}
            label="Log In"
            component={NavLink}
            to="/auth/login"
            style={{
              color:
                value === 1 ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
              padding: 0,
            }}
          />
        </Tabs>
        {value === 0 && <RegisterForm onSubmit={onRegister} />}
        {value === 1 && <LoginForm onSubmit={onLogin} />}
      </div>
    </div>
  );
};

export default AuthPage;
