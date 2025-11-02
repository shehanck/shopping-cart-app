import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../../../services/apiSlice';

export const useGetOrders = () => {
  const token = useSelector((s) => s.auth.token);
  const userId = useSelector((s) => s.auth.user?._id || s.auth.user?.id) || 'guest';
  const { data = [], isLoading, isError, error, refetch } = 
    useGetUserOrdersQuery(
        token ? userId : undefined,
        {
            skip: !token,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            refetchOnReconnect: true,
        }
    );
  return { orders: data, isLoading, isError, error, refetch, token, userId };
};