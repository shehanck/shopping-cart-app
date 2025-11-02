import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RootLayout from './layouts/RootLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import OrderHistory from './features/orders/OrderHistory';
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
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/logout" element={<Logout />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/orders" element={<OrderHistory />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
