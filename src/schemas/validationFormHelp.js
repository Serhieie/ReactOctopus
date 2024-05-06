import * as yup from 'yup';

const validationFormHelp = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
  comment: yup
    .string()
    .required('Comment is required')
    .min(8, 'Comment must be at least 8 characters long')
    .max(68, 'Comment must not exceed 68 characters'),
});

export default validationFormHelp;
