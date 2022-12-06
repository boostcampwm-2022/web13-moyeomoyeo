import { AxiosError } from 'axios';

import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { ArticlePreviewType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface ArticlePagingData {
  totalPage: number;
  currentPage: number;
  countPerPage: number;
  data: ArticlePreviewType[];
}

interface ArticleResponseType {
  status: string;
  message: string;
  data: ArticlePagingData;
}

const getMyWriteArticles = async (currentPage: number) => {
  const {
    data: { data },
  } = await clientAxios.get<ArticleResponseType>('/v1/my-group-articles', {
    params: { currentPage, countPerPage: 6 },
  });
  return data;
};

const useFetchMyWriteArticles = () => {
  const queryResult = useAuthInfiniteQuery<ArticlePagingData, AxiosError, ArticlePagingData>(
    ['articles', 'mywrite'],
    ({ pageParam = 1 }) => getMyWriteArticles(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.totalPage === lastPage.currentPage ? undefined : lastPage.currentPage + 1,
    }
  );
  return { ...queryResult };
};

export default useFetchMyWriteArticles;
