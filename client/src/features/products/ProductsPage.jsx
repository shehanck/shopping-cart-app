import React, { useState } from 'react';
import { useGetProducts } from '../products/hooks/useGetProducts';
import { ProductCard } from './components';
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

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const { products, isLoading, isError, error } = useGetProducts(term);

  const handleSearch = () => setTerm(search);

  return (
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

      {isLoading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : isError ? (
        <Alert severity="error">{error?.data?.message || 'Failed to load products'}</Alert>
      ) : products.length === 0 ? (
        <Typography variant="h6">No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductsPage;