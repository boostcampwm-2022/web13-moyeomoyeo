import { AxiosError, AxiosResponse } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ArticleType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface ResponseType {
  status: string;
  message: string;
  data: ArticleType;
}

const getSpecificArticle = async (id: number) => {
  return clientAxios.get(`/v1/group-articles/${id}`);
};

const useFetchArticle = (id: number) => {
  const { data, isLoading } = useAuthQuery<AxiosResponse<ResponseType>, AxiosError, ArticleType>(
    ['article', id],
    () => getSpecificArticle(id),
    {
      select: (res) => res.data.data,
    }
  );

  return { article: data, isLoading };
};

export default useFetchArticle;
