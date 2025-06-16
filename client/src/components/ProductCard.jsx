import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import StarRating from './StarRating';
import api from '../services/api';
import styles from './ProductCard.module.css';

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
    <div className={styles.card}>
      <img className={styles.image} src={product.image} alt={product.title} width="100%" />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price}</p>
      <p>Discount: {product.discount}%</p>
      <p>Rating: {avgRating}</p>
      <StarRating onRate={handleRating} />
      <button className={styles.button} onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
