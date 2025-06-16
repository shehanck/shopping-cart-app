import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import styles from './Home.module.css';

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
    <div className={styles.container}>
      <Navbar />
      <div className={styles.container}>
        <input className={styles.searchInput} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.grid}>
          {items.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
