import * as yup from 'yup';

export const loginForm = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: yup.object({
    email: yup.string().email().required('Email must not be empty'),
    password: yup.string().required('Password must not be empty'),
  }),
};
