import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const applyGroup = (groupArticleId: number) =>
  clientAxios.post('/v1/group-applications', groupArticleId);

const useApplyGroup = (groupArticleId: number) => {
  const queryClient = useQueryClient();
  return useAuthMutation(applyGroup, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['applicationStatus', groupArticleId]);
      // TODO 신청 인원 invalidate
    },
  });
};

export default useApplyGroup;
