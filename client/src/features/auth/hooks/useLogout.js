import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../authSlice';
import { apiSlice } from '../../../services/apiSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    // Clear auth and localStorage via slice
    dispatch(logout());
    // Reset RTK Query cache so user-specific data is cleared
    dispatch(apiSlice.util.resetApiState());
    // Navigate home
    navigate('/');
  }, [dispatch, navigate]);

  return { onLogout };
};