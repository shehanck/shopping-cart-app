import React from 'react';
import { useGetOrders } from './hooks/useGetOrders';
import { OrdersList } from './components';
import {
  Container,
  Typography,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';

const OrderHistory = () => {
  const { orders = [], isLoading, isError, error, token } = useGetOrders();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Order History
        </Typography>

         {!token && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Please login to view your orders.
          </Alert>
        )}

        {token && isLoading && (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {token && isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.data?.message || 'Failed to load orders'}
          </Alert>
        )}

        {token && !isLoading && !isError && (
        <OrdersList orders={orders} />
      )}
      </Container>
    </>
  );
};

export default OrderHistory;
