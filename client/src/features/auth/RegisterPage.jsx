import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthController } from './hooks/useAuthController';
import { useRegisterUser } from './hooks/useRegisterUser';
import { RegisterForm } from './components';

const RegisterPage = () => {
  const { onAuthed } = useAuthController();
  const { submit, isLoading, isError, error } = useRegisterUser();

  const formik = useFormik({
    initialValues: { email: '', password: '', mobile: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await submit(values);
        onAuthed(data);
      } catch {}
    },
  });

  return (
    <RegisterForm
      values={formik.values}
      errors={formik.errors}
      touched={formik.touched}
      onChange={formik.handleChange}
      onSubmit={formik.handleSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default RegisterPage;