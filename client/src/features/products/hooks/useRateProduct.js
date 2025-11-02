import { useRateProductMutation } from '../../../services/apiSlice';

export const useRateProduct = () => {
  const [mutate, state] = useRateProductMutation();
  const rate = (id, value) => mutate({ id, value });
  return { rate, ...state };
};