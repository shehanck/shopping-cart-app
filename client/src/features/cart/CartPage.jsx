import React from 'react';
import { CartList, CartSummary } from './components';
import { useCartController } from './hooks/useCartController';
import {
  Container,
  Typography
} from '@mui/material';

const CartPage = () => {
  const { cart, total, checkout, isPlacing } = useCartController();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      <CartList items={cart} />
      {cart.length > 0 && (
      <CartSummary total={total} onCheckout={checkout} disabled={isPlacing} />
      )}
    </Container>
  );
};

export default CartPage;