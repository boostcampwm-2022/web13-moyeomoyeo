import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const deleteArticle = (articleId: number) => clientAxios.delete(`/v1/group-articles/${articleId}`);

const useDeleteArticle = () => {
  return useAuthMutation(deleteArticle);
};

export default useDeleteArticle;
