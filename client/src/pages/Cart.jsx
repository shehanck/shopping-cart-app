import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import styles from './Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.post('/orders', {
        cartItems: cart
      }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    } catch (err) {
      alert('Checkout failed. Please login again.');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.title}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <div className={styles.itemsList}>
          {cart.map(item => (
            <div className={styles.item} key={item._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <img className={styles.image} src={item.image} alt={item.title} width="100%" />
              <h3 className={styles.name}>{item.title}</h3>
              <p className={styles.price}>Price: ${item.price}</p>
              <input
                className={styles.quantityInput}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(changeQuantity({ id: item._id, quantity: parseInt(e.target.value) }))}
              />
              <button className={styles.removeButton} onClick={() => dispatch(removeFromCart(item._id))} title="Remove item">❌</button>
            </div>
          ))}
          <div className={styles.total}>
            <strong>Total:</strong> <text className={styles.price}> ${total.toFixed(2)}</text>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button className={styles.button} onClick={() => navigate('/')}>Continue Shopping</button>
            <button className={styles.button} onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
