import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

import styles from './AuthPage.module.scss';
import { useDispatch } from 'react-redux';
import { signUp, logIn } from '../../redux/auth/authOperations';
import { clearTasks } from '../../redux/tasks/tasksSlice';
import { Link } from '@mui/material';

export const AuthPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(id === 'login' ? 1 : 0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onRegister = (data) => {
    dispatch(clearTasks());
    dispatch(signUp(data));
  };

  const onLogin = (data) => {
    dispatch(clearTasks());
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
              borderRadius: '10px',
              fontSize: '18px',
              textTransform: 'none',
              height: '24px',
              color:
                value === 0 ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background-color 1s, color 1s, opacity 0.5s',
            }}
          />
          <Tab
            className={styles.loginLink}
            label="Log In"
            component={NavLink}
            to="/auth/login"
            style={{
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '18px',
              height: '24px',
              color:
                value === 1 ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background-color 1s, color 1s, opacity 0.5s',
            }}
          />
          <Tab
            className={styles.googleLink}
            label={
              <span className={styles.googleSpan}>
                Login{' '}
                <svg
                  version="1.1"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: 'block' }}
                  width={20}
                  height={20}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </span>
            }
            component={Link}
            href="http://localhost:3000/api/auth/google"
            style={{
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '18px',
              height: '24px',
              color:
                value === 2 ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background-color 1s, color 1s, opacity 0.5s',
            }}
          />
        </Tabs>
        <div className={styles.content}>
          {value === 0 && <RegisterForm onSubmit={onRegister} />}
          {value === 1 && <LoginForm onSubmit={onLogin} />}
          {value === 2 && <LoginForm onSubmit={onLogin} />}
        </div>
      </div>
    </div>
  );
};
