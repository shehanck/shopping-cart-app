import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeQuantity, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../services/apiSlice';
import { selectCartItems, selectCartTotal } from '../features/cart/selectors';
import { useToast } from '../components/ToastProvider';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [placeOrder] = usePlaceOrderMutation();
  const toast = useToast();

  const handleCheckout = async () => {
    try {
      await placeOrder(cart).unwrap(); // throws if error
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    } catch (err) {
      toast.error('Checkout failed. Please login again.');
      console.error(err);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Alert severity="info">Your cart is empty.</Alert>
        ) : (
          <Box>
            {cart.map((item) => (
              <Card key={item._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.price}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        type="number"
                        size="small"
                        fullWidth
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            changeQuantity({
                              id: item._id,
                              quantity: parseInt(e.target.value) || 1,
                            })
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            <Box display="flex" justifyContent="right" gap={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textSecondary">
                  Total: ${total.toFixed(2)}
                </Typography>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="space-between" gap={2}>
              <Button variant="outlined" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Cart;
