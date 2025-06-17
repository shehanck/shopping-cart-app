import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
  Rating,
} from '@mui/material';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleRating = async (value) => {
    if (!token) {
      alert('Login to rate');
      return;
    }
    try {
      await api.post(
        `/products/${product._id}/rate`,
        { value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Rating submitted');
    } catch (err) {
      alert('Error rating product');
    }
  };

  const avgRating = product.ratings?.length
    ? product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length
    : 0;

  return (
    <Card sx={{ maxWidth: 300, mx: 'auto', p: 1 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain' }}
      />

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discount: {product.discount}%
        </Typography>
        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <Rating
            name={`rating-${product._id}`}
            value={avgRating}
            precision={0.5}
            onChange={(_, value) => handleRating(value)}
          />
          <Typography variant="caption">
            {product.ratings?.length ? avgRating.toFixed(1) : 'No ratings'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
