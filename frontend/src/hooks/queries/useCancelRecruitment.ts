import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientAxios } from '@utils/commonAxios';

const cancelRecruitment = (articleId: number) =>
  clientAxios.post(`/v1/group-articles/${articleId}/recruitment-cancel`);

const useCancelRecruitment = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelRecruitment, {
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries(['article', variables]);
    },
  });
};

export default useCancelRecruitment;
