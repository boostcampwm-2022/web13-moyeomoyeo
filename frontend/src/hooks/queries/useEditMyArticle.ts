import useAuthMutation from '@hooks/useAuthMutation';
import { ArticleInputType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const updateArticle = ({
  articleId,
  articleInput,
}: {
  articleId: number;
  articleInput: ArticleInputType;
}) => {
  const { title, content, thumbnail, chatUrl } = articleInput;
  return clientAxios.put(`/v1/group-articles/${articleId}`, {
    title,
    contents: content,
    thumbnail,
    chatUrl,
  });
};

const useEditMyArticle = () => {
  return useAuthMutation(updateArticle);
};

export default useEditMyArticle;
