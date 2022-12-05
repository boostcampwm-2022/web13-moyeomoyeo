import useAuthMutation from '@hooks/useAuthMutation';
import { ArticlePostType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const updateArticle = ({
  articleId,
  articleInput,
}: {
  articleId: number;
  articleInput: ArticlePostType;
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
