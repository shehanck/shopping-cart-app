import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/apiSlice';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

  const formik = useFormik({
    initialValues: { email: '', password: '', mobile: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await registerUser(values).unwrap();
        dispatch(setCredentials(data));
        navigate('/');
      } catch {}
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            type="text"
            margin="normal"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error?.data?.message || 'Registration failed'}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
