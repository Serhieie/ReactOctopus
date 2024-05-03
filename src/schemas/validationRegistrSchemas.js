import * as yup from 'yup';

const validationRegistrSchema = yup.object().shape({
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

export default validationRegistrSchema;
