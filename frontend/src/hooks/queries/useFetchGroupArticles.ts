import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import getTestGroupArticles from '@apis/test/getTestGroupArticles';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { ArticleType } from '@typings/types';

interface ArticleResponseType {
  articles: ArticleType[];
  isLast: boolean;
  currentId: number;
}

const useFetchGroupArticles = (category: Category, location: Location, progress: boolean) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery(
    ['articles'],
    ({ pageParam = 0 }) => getTestGroupArticles(pageParam, category, location, progress),
    {
      getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
        lastPage.data.isLast ? undefined : lastPage.data.currentId + 1,
    }
  );
  if (isError) {
    // TODO 에러 처리 공통 로직 적용
  }
  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchGroupArticles;
