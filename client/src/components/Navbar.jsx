import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link>
      {token && <Link to="/orders">My Orders</Link>}
      <Link to="/cart">🛒 Cart ({cartCount})</Link>
      {!token && <Link to="/login">Login</Link>}
      {token && <Link to="/logout">Logout</Link>}
    </nav>
  );
};

export default Navbar;
