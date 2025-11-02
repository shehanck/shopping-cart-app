import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

const RootLayout = () => (
  <>
    <Navbar />
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  </>
);

export default RootLayout;