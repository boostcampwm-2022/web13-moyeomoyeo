import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse, MyArticleType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const getMyArticle = async (id: number) => {
  return clientAxios.get(`/v1/my-group-articles/${id}`);
};

const useFetchMyArticle = (id: number) => {
  const { data, isLoading } = useAuthQuery<ApiResponse<MyArticleType>, AxiosError, MyArticleType>(
    ['article', 'my', id],
    () => getMyArticle(id),
    {
      select: (res) => res.data.data,
    }
  );
  return { data, isLoading };
};

export default useFetchMyArticle;
