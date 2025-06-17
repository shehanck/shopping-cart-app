import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('token');

    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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
