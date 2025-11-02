import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ToastProvider from './components/ToastProvider';
import RootLayout from './layouts/RootLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import OrderHistory from './features/orders/OrderHistory';
import RegisterPage from './features/auth/RegisterPage';
import LoginPage from './features/auth/LoginPage';
import ProductsPage from './features/products/ProductsPage';
import CartPage from './features/cart/CartPage';

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
      <ToastProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/orders" element={<OrderHistory />} />
            </Route>

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
