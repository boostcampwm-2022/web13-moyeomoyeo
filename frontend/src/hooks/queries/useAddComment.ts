import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { CommentInputType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const addComment = (commentInput: CommentInputType) =>
  clientAxios.post('/v1/comments', {
    ...commentInput,
  });

const useAddComment = (articleId: number) => {
  const queryClient = useQueryClient();
  return useAuthMutation(addComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['article', articleId]);
      await queryClient.invalidateQueries(['comments', articleId]);
    },
  });
};

export default useAddComment;
