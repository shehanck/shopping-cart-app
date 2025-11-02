import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // 🔁 replace with actual backend
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (cartItems) => ({
        url: '/orders',
        method: 'POST',
        body: { cartItems },
      }),
      invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
    }),
    getProducts: builder.query({
        query: (search = '') => `/products?search=${search}`,
        providesTags: (result) =>
    result && Array.isArray(result)
      ? [
          ...result.map((p) => ({ type: 'Product', id: p._id })),
          { type: 'Product', id: 'LIST' },
        ]
      : [{ type: 'Product', id: 'LIST' }],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    rateProduct: builder.mutation({
      query: ({ id, value }) => ({
        url: `/products/${id}/rate`,
        method: 'POST',
        body: { value },
      }),
      invalidatesTags: (arg) => [{ type: 'Product', id: arg.id }],
    }),
    getUserOrders: builder.query({
      query: (_userId) => '/orders/my',
      providesTags: (result, error, _arg, _meta) =>
    result && Array.isArray(result)
      ? [
          ...result.map((o) => ({ type: 'Order', id: o._id })),
          { type: 'Order', id: 'LIST' },
        ]
      : [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetProductsQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useRateProductMutation,
  useGetUserOrdersQuery,
} = apiSlice;
