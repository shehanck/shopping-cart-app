// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../services/api';

// export const fetchProducts = createAsyncThunk('products/fetch', async (search = '') => {
//   const res = await axios.get(`/products?search=${search}`);
//   return res.data;
// });

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => { state.loading = true; })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productSlice.reducer;
