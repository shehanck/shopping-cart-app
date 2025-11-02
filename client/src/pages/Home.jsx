import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { useGetProductsQuery } from '../redux/apiSlice';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();  
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: items = [], loading, error } = useGetProductsQuery(searchTerm);

  const handleSearch = () => {
     setSearchTerm(search); // triggers refetch with new term
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : items.length === 0 ? (
          <Typography variant="h6">No products found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {items.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;
