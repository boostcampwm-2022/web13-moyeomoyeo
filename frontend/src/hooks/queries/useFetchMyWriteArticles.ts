import { AxiosError, AxiosResponse } from 'axios';

import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { ArticlePreviewType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

export interface ArticleResponseType {
  status: string;
  message: string;
  data: {
    totalPage: number;
    currentPage: number;
    countPerPage: number;
    data: ArticlePreviewType[];
  };
}

const getMyWriteArticles = async (currentPage: number) =>
  clientAxios.get('/v1/group-articles/me', {
    params: { currentPage, countPerPage: 6 },
  });

const useFetchMyWriteArticles = () => {
  const queryResult = useAuthInfiniteQuery<
    AxiosResponse<ArticleResponseType>,
    AxiosError,
    ArticlePreviewType[]
  >(['articles', 'mywrite'], ({ pageParam = 1 }) => getMyWriteArticles(pageParam), {
    getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
      lastPage.data.data.totalPage === lastPage.data.data.currentPage
        ? undefined
        : lastPage.data.data.currentPage + 1,
  });
  return { ...queryResult };
};

export default useFetchMyWriteArticles;
