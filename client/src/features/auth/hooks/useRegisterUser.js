import { useRegisterUserMutation } from '../../../services/apiSlice';

export const useRegisterUser = () => {
  const [register, state] = useRegisterUserMutation();
  const submit = (values) => register(values).unwrap();
  return { submit, ...state };
};