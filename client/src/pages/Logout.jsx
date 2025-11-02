import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    dispatch(logout());
    const timeout = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;
