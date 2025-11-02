import React from 'react';
import { Box, Typography } from '@mui/material';
import OrderRow from './OrderRow';

const OrdersList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>No orders yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {orders.map((o, index) => (
        <OrderRow key={o._id} order={o} index={index} totalCount={orders.length} />
      ))}
    </Box>
  );
};

export default OrdersList;