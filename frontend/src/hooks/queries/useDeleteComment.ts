import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const deleteComment = (commentId: number) => clientAxios.delete(`/v1/comments/${commentId}`);

const useDeleteComment = (articleId: number) => {
  const queryClient = useQueryClient();
  return useAuthMutation(deleteComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['comments', articleId]);
    },
  });
};

export default useDeleteComment;
