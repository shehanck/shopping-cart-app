import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

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
            <Button component={Link} to="/logout" color="inherit">
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
