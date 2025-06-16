import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">Home</Link>
      {token && <Link className={styles.link} to="/orders">My Orders</Link>}
      <Link className={styles.link} to="/cart">Cart 🛒({cartCount})</Link>
      {!token && <Link className={styles.link} to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
