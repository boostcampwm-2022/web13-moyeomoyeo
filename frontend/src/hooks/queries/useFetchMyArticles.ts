import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import getTestMyGroupArticles from '@apis/test/getTestMyGroupArticles';
import { ArticleType } from '@typings/types';

interface ArticleResponseType {
  articles: ArticleType[];
  isLast: boolean;
  currentId: number;
}

const useFetchMyArticles = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery(
    ['articles', 'myparticipate'],
    ({ pageParam = 0 }) => getTestMyGroupArticles(pageParam),
    {
      getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
        lastPage.data.isLast ? undefined : lastPage.data.currentId + 1,
    }
  );

  return { data, fetchNextPage, hasNextPage, isFetching, isError };
};

export default useFetchMyArticles;
