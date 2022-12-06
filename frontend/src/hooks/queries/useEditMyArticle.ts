import useAuthMutation from '@hooks/useAuthMutation';
import { ArticlePostInputType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const updateArticle = ({
  articleId,
  articleInput,
}: {
  articleId: number;
  articleInput: ArticlePostInputType;
}) => {
  const { title, contents, thumbnail, chatUrl } = articleInput;
  return clientAxios.put(`/v1/group-articles/${articleId}`, {
    title,
    contents,
    thumbnail,
    chatUrl,
  });
};

const useEditMyArticle = () => {
  return useAuthMutation(updateArticle);
};

export default useEditMyArticle;
