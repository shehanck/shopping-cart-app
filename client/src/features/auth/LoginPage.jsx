import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthController } from './hooks/useAuthController';
import { useLoginUser } from './hooks/useLoginUser';
import { LoginForm } from './components';

const LoginPage = () => {
  const { onAuthed } = useAuthController();
  const { submit, isLoading, isError, error } = useLoginUser();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await submit(values);
        onAuthed(data);
      } catch {}
    },
  });

  return (
    <>
      <LoginForm
        values={formik.values}
        errors={formik.errors}
        touched={formik.touched}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default LoginPage;