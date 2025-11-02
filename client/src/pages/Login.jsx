import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCredentials  } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/apiSlice';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await login(values).unwrap();
        dispatch(setCredentials(data));
        navigate('/');
      } catch {}
    }
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
          Login
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

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error?.data?.message || 'Login failed'}
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
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
