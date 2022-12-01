import { AxiosError, AxiosResponse } from 'axios';

import getSpecificArticle from '@apis/group-articles/getSpecificArticle';
import useAuthQuery from '@hooks/useAuthQuery';
import { ArticleType } from '@typings/types';

interface ResponseType {
  status: string;
  message: string;
  data: ArticleType;
}

const useFetchArticle = (id: number) => {
  const { data, isLoading } = useAuthQuery<AxiosResponse<ResponseType>, AxiosError, ArticleType>(
    ['article', id],
    () => getSpecificArticle(id),
    {
      select: (res) => res.data.data,
    }
  );

  return { data, isLoading };
};

export default useFetchArticle;
