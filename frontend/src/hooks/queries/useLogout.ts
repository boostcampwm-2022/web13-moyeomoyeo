import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const postLogout = () => {
  return clientAxios.post('/v1/auth/logout');
};

const useLogout = () => {
  const queryClient = useQueryClient();
  return useAuthMutation(postLogout, {
    onSuccess: async () => {
      await queryClient.resetQueries(['my']);
    },
  });
};

export default useLogout;
