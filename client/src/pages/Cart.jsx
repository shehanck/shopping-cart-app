import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);

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
    <div>
      <Navbar />
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(changeQuantity({ id: item._id, quantity: parseInt(e.target.value) }))}
              />
              <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
            </div>
          ))}
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
