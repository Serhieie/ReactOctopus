import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './UserEditModalForm.module.scss';
import schema from '../../../schemas/validationRegistrSchemas';
import { updateUser } from '../../../redux/auth/authOperations';
import { setUserPlaceholder } from '../../../helpers';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  useClickOnBackdropToCloseModals,
  useEscapeKeyToCloseModals,
  useAuth,
} from '../../../hooks';

const UserEditModalForm = ({ userData, func }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.validationEditUSerSchema),
  });

  const userInitState = { ...userData, password: '', avatar: '' };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(userInitState);

  const { avatarURL, theme } = useAuth();

  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useClickOnBackdropToCloseModals(func);
  useEscapeKeyToCloseModals(func);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = (data) => {
    const newFormData = new FormData();
    newFormData.append('avatar', data.avatar[0]);
    newFormData.append('name', data.name);
    newFormData.append('email', data.email);
    newFormData.append('password', data.password);

    dispatch(updateUser(newFormData));

    func();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((d) => {
        onSubmit(d);
      })}
      encType="multipart/form-data"
      noValidate
    >
      <div className={styles.inputContainerImg}>
        {previewImage && (
          <img className={styles.img} src={previewImage} alt="Preview" />
        )}
        {!previewImage && (
          <img
            className={styles.img}
            src={avatarURL || setUserPlaceholder(theme)}
            alt="user avatar"
          />
        )}
        <input
          className={styles.loadInput}
          {...register('avatar', { required: false })}
          type="file"
          placeholder="Enter you name"
          name="avatar"
          id="picture"
          onChange={handleFileChange}
          accept=".jpg, .png"
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={clsx(styles.boardModal, {
            [styles.inputDark]: theme === 'dark',
            [styles.inputLight]: theme === 'light',
            [styles.inputViolet]: theme === 'violet',
          })}
          {...register('name', { required: false })}
          type="text"
          placeholder="Enter your or new name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={clsx(styles.boardModal, {
            [styles.inputDark]: theme === 'dark',
            [styles.inputLight]: theme === 'light',
            [styles.inputViolet]: theme === 'violet',
          })}
          {...register('email', { required: false })}
          type="email"
          placeholder="Enter your or new email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={clsx(styles.boardModal, {
            [styles.inputDark]: theme === 'dark',
            [styles.inputLight]: theme === 'light',
            [styles.inputViolet]: theme === 'violet',
          })}
          {...register('password', { required: false })}
          value={formData.password}
          onChange={handleFormData}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your or new password"
        />

        {errors.password && (
          <p className={styles.error} style={{ fontWeight: 500 }}>
            {errors.password.message}
          </p>
        )}

        <div className={styles.iconContainer}>
          {showPassword ? (
            <RiEyeLine
              className={clsx(styles.boardModal, {
                [styles.iconDark]: theme === 'dark',
                [styles.iconLight]: theme === 'light',
                [styles.iconViolet]: theme === 'violet',
              })}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <RiEyeCloseLine
              className={clsx(styles.boardModal, {
                [styles.iconDark]: theme === 'dark',
                [styles.iconLight]: theme === 'light',
                [styles.iconViolet]: theme === 'violet',
              })}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>

      <button
        className={clsx(styles.boardModal, {
          [styles.buttonDark]: theme === 'dark',
          [styles.buttonLight]: theme === 'light',
          [styles.buttonViolet]: theme === 'violet',
        })}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default UserEditModalForm;
