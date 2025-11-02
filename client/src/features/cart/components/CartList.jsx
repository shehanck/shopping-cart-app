import React from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../cartSlice';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

const CartList = ({ items }) => {
  const dispatch = useDispatch();

  if (!items?.length) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Box>
      {items.map((item) => (
        <Card key={item._id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price}
                </Typography>
                {item.discount ? (
                  <Typography variant="body2" color="text.secondary">
                    Discount: {item.discount}%
                  </Typography>
                ) : null}
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
                        quantity: Math.max(1, parseInt(e.target.value, 10) || 1),
                      })
                    )
                  }
                  inputProps={{ min: 1 }}
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
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default CartList;