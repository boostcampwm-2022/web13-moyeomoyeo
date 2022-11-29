import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import getTestGroupArticles from '@apis/test/getTestGroupArticles';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { ArticleType } from '@typings/types';

import AuthError from '../../error/AuthError';

interface ArticleResponseType {
  articles: ArticleType[];
  isLast: boolean;
  currentId: number;
}

const useFetchGroupArticles = (category: Category, location: Location, progress: boolean) => {
  const { data, fetchNextPage, hasNextPage, isFetching, error } = useInfiniteQuery<
    Promise<AxiosResponse<ArticleResponseType>>,
    AxiosError
  >(
    ['articles'],
    ({ pageParam = 0 }) => getTestGroupArticles(pageParam, category, location, progress),
    {
      // @ts-expect-error
      getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
        lastPage.data.isLast ? undefined : lastPage.data.currentId + 1,
    }
  );

  if (error) {
    if (error.response && error.response.status === 401) {
      throw new AuthError();
    }
    throw error;
  }
  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchGroupArticles;
