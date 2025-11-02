import React from 'react';
import { useSelector } from 'react-redux';
import { useLogout } from '../features/auth/hooks/useLogout';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../features/cart/selectors';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const cartCount = useSelector(selectCartCount);
  const { onLogout } = useLogout();

  return (
    <AppBar position="static" color="default" sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Shopping Store
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {token && (
            <Button component={Link} to="/orders" color="inherit">
              My Orders
            </Button>
          )}
          {!token && (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
          {token && (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Box>

        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
