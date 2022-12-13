import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { UserType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const updateProfile = (userProfile: Omit<UserType, 'id'>) =>
  clientAxios.put('/v1/my-info', userProfile);

const useEditMyProfile = () => {
  const queryClient = useQueryClient();
  return useAuthMutation(updateProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my']);
    },
  });
};

export default useEditMyProfile;
