import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientAxios } from '@utils/commonAxios';

const completeRecruitment = (articleId: number) =>
  clientAxios.post(`/v1/group-articles/${articleId}/recruitment-complete`);

const useCompleteRecruitment = () => {
  const queryClient = useQueryClient();
  return useMutation(completeRecruitment, {
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries(['article', variables]);
    },
  });
};

export default useCompleteRecruitment;
