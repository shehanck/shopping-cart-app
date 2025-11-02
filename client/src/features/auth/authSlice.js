import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const savedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser || null,
    token: token || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
