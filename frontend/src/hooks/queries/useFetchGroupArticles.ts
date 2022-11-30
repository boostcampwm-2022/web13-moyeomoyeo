import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import getGroupArticles from '@apis/group-articles/getGroupArticles';
import AuthError from '@components/common/ErrorBoundary/AuthError';
import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { ArticlePreviewType, ArticleType } from '@typings/types';

interface ArticleResponseType {
  status: string;
  message: string;
  data: {
    totalPage: number;
    currentPage: number;
    countPerPage: number;
    data: ArticlePreviewType[];
  };
}

const useFetchGroupArticles = (
  category: Category | null,
  location: Location | null,
  status: ArticleStatus | null
) => {
  const { data, fetchNextPage, hasNextPage, isFetching, error } = useInfiniteQuery<
    AxiosResponse<ArticleResponseType>,
    AxiosError,
    ArticleType[]
  >(['articles'], ({ pageParam = 1 }) => getGroupArticles(pageParam, category, location, status), {
    getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
      lastPage.data.data.totalPage === lastPage.data.data.currentPage
        ? undefined
        : lastPage.data.data.currentPage + 1,
  });

  if (error) {
    if (error.response && error.response.status === 401) {
      throw new AuthError();
    }
    throw error;
  }
  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchGroupArticles;
