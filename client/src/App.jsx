import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
