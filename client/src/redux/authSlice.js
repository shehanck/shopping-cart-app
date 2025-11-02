import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
