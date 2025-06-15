import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const OrderHistory = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.get('/orders/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <Navbar />
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <h4>Order #{orders.length - index}</h4>
            <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.title} - ${item.price} × {item.quantity} 
                  {item.discount ? ` (Discount: ${item.discount}%)` : ''}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
