import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ total, onCheckout, disabled }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Box display="flex" gap={2}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
        <Button variant="contained" onClick={onCheckout} disabled={disabled}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;