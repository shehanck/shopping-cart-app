import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

const LoginForm = ({ values, errors, touched, onChange, onSubmit, isLoading, isError, error }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>

        <form onSubmit={onSubmit}>
          <TextField
            fullWidth label="Email" name="email" type="email" margin="normal"
            value={values.email} onChange={onChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth label="Password" name="password" type="password" margin="normal"
            value={values.password} onChange={onChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error?.data?.message || 'Login failed'}
            </Alert>
          )}

          <Button variant="contained" color="primary" fullWidth type="submit" disabled={isLoading} sx={{ mt: 2 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;