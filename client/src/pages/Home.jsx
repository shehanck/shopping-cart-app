import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchProducts(search));
  };

  return (
    <div>
      <Navbar />
      <div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 200px)', gap: '1rem' }}>
          {items.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
