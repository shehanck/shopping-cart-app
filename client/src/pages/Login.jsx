import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(loginUser(values));
      if (!res.error) navigate('/');
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" required={true} onChange={formik.handleChange} />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        <input type="password" name="password" placeholder="Password" required={true} onChange={formik.handleChange} />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
