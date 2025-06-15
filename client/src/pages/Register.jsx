import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { email: '', password: '', mobile: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile').required('Required'),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(registerUser(values));
      if (!res.error) navigate('/');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Register</h2>
      <input type="email" name="email" placeholder="Email" required={true} onChange={formik.handleChange} />
      {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
      <input type="password" name="password" placeholder="Password" required={true} onChange={formik.handleChange} />
      {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
      <input type="text" name="mobile" placeholder="Mobile" required={true} onChange={formik.handleChange} />
      {formik.touched.mobile && formik.errors.mobile && <div>{formik.errors.mobile}</div>}
      {error && <div>{error}</div>}
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
};

export default Register;
