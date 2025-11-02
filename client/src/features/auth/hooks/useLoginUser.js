import { useLoginUserMutation } from '../../../services/apiSlice';

export const useLoginUser = () => {
  const [login, state] = useLoginUserMutation();
  const submit = (values) => login(values).unwrap();
  return { submit, ...state };
};