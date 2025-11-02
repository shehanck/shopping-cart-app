import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuthController = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAuthed = (data) => {
    dispatch(setCredentials(data));
    navigate('/');
  };

  return { onAuthed };
};