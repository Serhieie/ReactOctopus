import React from 'react';
import { useForm } from 'react-hook-form';

import styles from "./RegisterForm.module.scss"

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} type="text" placeholder="Enter you name" />
      {errors.name && <p>Name is required</p>}
      
      <input {...register('email', { required: true })} type="email" placeholder="Enter you email" />
      {errors.email && <p>Email is required</p>}
      
      <input {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Create a password" />
      {errors.password && errors.password.type === 'minLength' && <p>Password must be at least 8 characters long</p>}
      
      <button type="submit">Register Now</button>
    </form>
  );
};

export default RegisterForm;