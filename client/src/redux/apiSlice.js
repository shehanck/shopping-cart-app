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
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (cartItems) => ({
        url: '/orders',
        method: 'POST',
        body: { cartItems },
      }),
    }),
    getProducts: builder.query({
        query: (search = '') => `/products?search=${search}`,
        providesTags: (result) =>
    result
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
      query: () => '/orders/my',
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
