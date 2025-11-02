import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../cartSlice';
import { usePlaceOrderMutation } from '../../../services/apiSlice';
import { useToast } from '../../../components/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../selectors';

export const useCartController = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [placeOrder, state] = usePlaceOrderMutation();

  const checkout = async () => {
    try {
      await placeOrder(cart).unwrap();
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      navigate('/orders'); // shows new order; Order tags handle refetch
    } catch {
      toast.error('Checkout failed. Please login again.');
    }
  };

  return { cart, total, checkout, isPlacing: state.isLoading };
};