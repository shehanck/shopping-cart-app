import { useGetProductsQuery } from '../../../services/apiSlice';

export const useGetProducts = (search) => {
  const { data = [], isLoading, isError, error, refetch } = useGetProductsQuery(search);
  return { products: data, isLoading, isError, error, refetch };
};