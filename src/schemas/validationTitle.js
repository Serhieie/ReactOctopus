import * as yup from 'yup';

const validationTitle = yup.object().shape({
  title: yup.string().required('Title is required'),
});

export default validationTitle;
