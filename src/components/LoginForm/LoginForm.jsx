import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', { required: true })} 
        type="email" 
        placeholder="Enter your email" 
      />
      {errors.email && <p>Email is required</p>}
      
      <input 
        {...register('password', { required: true, minLength: 8 })} 
        type={showPassword ? 'text' : 'password'} 
        placeholder="Enter your password" 
      />
      {errors.password && errors.password.type === 'minLength' && <p>Password must be at least 8 characters long</p>}

      {showPassword ? (
        <RiEyeLine onClick={togglePasswordVisibility} />
      ) : (
        < RiEyeCloseLine onClick={togglePasswordVisibility} />
      )}

      <button type="submit">Log In Now</button>
    </form>
  );
};

export default LoginForm;