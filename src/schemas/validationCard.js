import * as yup from 'yup';

export const validationCardSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});
