import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

import styles from "./LoginForm.module.scss"

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      
      <div className={styles.inputContainer}>
      <input className={styles.input} 
        {...register('email', { required: true })} 
        type="email" 
        placeholder="Enter your email" 
      />
      {errors.email && errors.email.type === 'required' &&  <p className={styles.error}>Email is required</p>}
      </div>
      
      <div className={styles.inputContainer}>
      <input className={styles.input}
        {...register('password', { required: true, minLength: 8, maxLength: 32 })} 
        type={showPassword ? 'text' : 'password'} 
        placeholder="Enter your password" 
         />
         
      {errors.password && errors.password.type === 'required' && <p className={styles.error}>Password is required</p>}
      {errors.password && errors.password.type === 'minLength' && <p className={styles.error}>Password must be at least 8 characters long</p>}
      {errors.password && errors.password.type === 'maxLength' && <p className={styles.error}>Password can not be more then 32 characters</p>}

        <div className={styles.iconContainer}>
      {showPassword ? (
        <RiEyeLine className={styles.icon} onClick={togglePasswordVisibility} />
      ) : (
        < RiEyeCloseLine className={styles.icon} onClick={togglePasswordVisibility} />
      )}
         </div>
         
       </div>

      <button className={styles.button} type="submit">Log In Now</button>
    </form>
  );
};

export default LoginForm;