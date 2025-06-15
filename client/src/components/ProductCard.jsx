import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import StarRating from './StarRating';
import api from '../services/api';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleRating = async (value) => {
    if (!token) {
      alert('Login to rate');
      return;
    }
    try {
      await api.post(`/products/${product._id}/rate`, { value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Rating submitted');
    } catch (err) {
      alert('Error rating product');
    }
  };

  const avgRating = product.ratings?.length
    ? (product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length).toFixed(1)
    : 'No ratings';

  return (
    <div className="border p-3 rounded shadow-sm">
      <img src={product.image} alt={product.title} width="100%" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Discount: {product.discount}%</p>
      <p>Rating: {avgRating}</p>
      <StarRating onRate={handleRating} />
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
