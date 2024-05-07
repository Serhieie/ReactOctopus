import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

import { selectUser } from '../../redux/auth/authSelectors';

import styles from './UserForm.module.scss';

import { imageExists } from '../../hooks/imageExists';

import { SuccessIcon } from 'assets/success.svg';
import { ErrorIcon } from 'assets/error.svg';

import avatarDark from '../../assets/user/userDark.png';

import { updateUser } from '../../redux/auth/authOperations';

export const UserForm = (isOpen, onClose) => {
  const globalRegex = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[a-zA-Z0-9 ]{2,32}$/, 'Invalid name format'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      ),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?]{8,64}$/,
        'Invalid password format'
      )
      .min(8, 'Password must be at least 8 characters long'),
  });

  const { userName, email, avatarURL } = useSelector(selectUser);

  const [newAvatar, setNewAvatar] = useState(avatarURL ?? '');
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');
  const [newUserName, setNewUserName] = useState(userName ?? '');
  const [newEmail, setNewEmail] = useState(email ?? '');
  const [newPassword, setNewPassword] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch();
  const avatarInputRef = useRef(null);

  let someChanges =
    userName !== newUserName ||
    email !== newEmail ||
    newPassword !== '' ||
    avatarPreviewUrl !== '';

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  useEffect(() => {
    function checkImg() {
      imageExists(avatarURL).then(function (exists) {
        if (!exists) setNewAvatar('');
        else setNewAvatar(avatarURL);
      });
    }
    checkImg();
  }, [avatarURL]);

  useEffect(() => {
    if (isSaving) {
      const id = setTimeout(() => {
        setIsSaving(false);
      }, 3000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [isSaving]);

  const handleIconContainerClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleIconOnClick = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreviewUrl(previewUrl);
    } else {
      setAvatarPreviewUrl(avatarURL);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!someChanges) return;

    setIsSaving(true);

    const formData = new FormData();
    if (avatarPreviewUrl !== '') formData.append('avatarURL', newAvatar);
    if (userName !== newUserName) formData.append('userName', newUserName);
    if (email !== newEmail) formData.append('email', newEmail);
    if (newPassword !== '') formData.append('newPassword', newPassword);

    dispatch(updateUser(formData));
    setNewPassword('');
  };

  const { register } = useForm({
      defaultValues: {
    // по желанию можно поменять placeholder на данные с backend
      }
    });
  const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Tittle */}
            <h2>Edit Profile</h2>

            {/* SVG for closing a modal window */}
            <span className="close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M3.646 3.646a.5.5 0 0 1 .708 0L8 7.293l3.646-3.647a.5.5 0 1 1 .708.708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
            
            {/* AVATAR */}
            <div>
              {avatarPreviewUrl ? (
                <img src={avatarPreviewUrl} alt={userName} />
              ) : newAvatar ? (
                <img src={newAvatar} alt={userName} />
              ) : (
                <img
                  style={{ position: 'absolute', top: 54, left: 20 }}
                  src={avatarDark}
                  alt="user avatar"
                />
              )}
              <div onClick={handleIconContainerClick} />
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                onChange={handleIconOnClick}
                style={{ display: 'none' }}
                name="avatar"
              />
            </div>

            {/* NAME */}
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="Name"
                ref={register({ required: true })}
                value={newUserName}
                onChange={(e) => {
                  setNewUserName(e.target.value);
                  setIsNameValid(
                    globalRegex.customFieldRegexp.test(e.target.value)
                  );
                }}
              />
              {newUserName ? (isNameValid ? SuccessIcon : ErrorIcon) : null}
            </div>

            {/* EMAIL */}
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                ref={register({ required: true })}
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setIsEmailValid(globalRegex.emailRegexp.test(e.target.value));
                }}
              />
              {newEmail ? (isEmailValid ? SuccessIcon : ErrorIcon) : null}
            </div>

            {/* PASSWORD */}

            <div
              style={{ position: 'relative' }}
              className={styles.inputContainer}
            >
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                ref={register({ required: true })}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setIsPasswordValid(
                    globalRegex.passwordRegexp.test(e.target.value)
                  );
                }}
              />
              {/* SVG to show a password */}
              <div className={styles.iconContainer}>
                {showPassword ? (
                  <RiEyeLine
                    className={styles.icon}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <RiEyeCloseLine
                    className={styles.icon}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M8 12a4 4 0 0 0 4-4 4 4 0 0 0-8 0 4 4 0 0 0 4 4zm0 2a9 9 0 0 1-4-1.06C2.91 12.3 1 10.45 1 8a7 7 0 0 1 14 0c0 2.45-1.91 4.3-3 4.94A9 9 0 0 1 8 14z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 0 1 12.77-6.51c.42.41.82.84 1.17 1.29C13.15 4.31 12.09 4 11 4c-3.04 0-5.5 2.46-5.5 5.5 0 .76.16 1.49.45 2.15A8.013 8.013 0 0 1 0 8zm16 0a8 8 0 0 0-12.77-6.51A15.106 15.106 0 0 1 4.5 8c0 .76-.16 1.49-.45 2.15A8.013 8.013 0 0 0 16 8z"
                />
              </svg> */}
              {newPassword ? (isPasswordValid ? SuccessIcon : ErrorIcon) : null}
              ;
            </div>

            {/* Button */}
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
