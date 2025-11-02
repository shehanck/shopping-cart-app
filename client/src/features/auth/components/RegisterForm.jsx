import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

const RegisterForm = ({ values, errors, touched, onChange, onSubmit, isLoading, isError, error }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>

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

          <TextField
            fullWidth label="Mobile Number" name="mobile" type="text" margin="normal"
            value={values.mobile} onChange={onChange}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error?.data?.message || 'Registration failed'}
            </Alert>
          )}

          <Button variant="contained" color="primary" fullWidth type="submit" disabled={isLoading} sx={{ mt: 2 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
	Already have an account?{' '}
	<Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
		Login
	</Link>
</Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;