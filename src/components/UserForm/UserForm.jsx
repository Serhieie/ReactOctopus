import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';

import styles from './UserForm.module.scss';

import { imageExists } from '../../hooks/imageExists';

import { SuccessIcon } from 'assets/success.svg';
import { ErrorIcon } from 'assets/error.svg';

import avatarDark from '../../assets/user/userDark.png';

import { updateUser } from '../../redux/auth/authOperations';

export const UserForm = (active, setActive) => {
  const globalRegex = {
    priorityList: ['low', 'medium', 'high'],
    categoryList: ['to-do', 'in-progress', 'done'],
    timeRegex: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    dateRegex: /^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,

    emailRegexp: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9_-]+).([a-zA-Z]{2,5})$/,
    phoneRegexp: /^\+\d{1,13}$/,
    birthdayRegexp: /^\d{2}\/\d{2}\/\d{4}$/,
    passwordRegexp: /^(?=.*\d)[A-Za-z\d]{6,}$/,

    customFieldRegexp: /^[A-Za-z0-9]{3,30}$/,
    SkypeRegexp: /^[a-z][a-z0-9\\.,\-_]{5,31}$/i,
  };

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

  return (
    <form className={styles.form} onSubmit={handleSubmit} onClick={() => setActive(false)}>
    <div className={styles.form_content} onClick={e => e.stopPropagation()}>
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

      <div>
        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          value={newUserName}
          onChange={(e) => {
            setNewUserName(e.target.value);
            setIsNameValid(globalRegex.customFieldRegexp.test(e.target.value));
          }}
        />
        {newUserName ? (isNameValid ? SuccessIcon : ErrorIcon) : null}
      </div>

      <div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email address"
          disabled="disabled"
          className="email-input-disabled"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
            setIsEmailValid(globalRegex.emailRegexp.test(e.target.value));
          }}
        />
        {newEmail ? (isEmailValid ? SuccessIcon : ErrorIcon) : null}
      </div>

      <div>
        <input
          type="text"
          name="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setIsPasswordValid(globalRegex.passwordRegexp.test(e.target.value));
          }}
        />
        {newPassword ? (isPasswordValid ? SuccessIcon : ErrorIcon) : null}
      </div>

      <button type="submit" disabled={isSaving || !someChanges}>
        Save
      </button>
    </div>
    
    </form>
  );
};

export default UserForm;
