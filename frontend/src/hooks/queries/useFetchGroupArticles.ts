import { useMemo } from 'react';

import { AxiosError } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { ArticlePreviewType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface ArticlePagingData {
  isLast: boolean;
  nextId: number;
  data: ArticlePreviewType[];
}
interface ArticleResponseType {
  status: string;
  message: string;
  data: ArticlePagingData;
}

export const getGroupArticles = async (
  nextId: number,
  category: Category,
  location: Location,
  filterProgress: boolean
) => {
  const status = filterProgress ? ArticleStatus.PROGRESS : null;
  const {
    data: { data },
  } = await clientAxios<ArticleResponseType>('v2/group-articles/search', {
    params: { category, location, status, nextId, limit: 8 },
  });
  return data;
};

const useFetchGroupArticles = (
  category: Category | null,
  location: Location | null,
  filterProgress: boolean
) => {
  const { data, ...rest } = useAuthInfiniteQuery<ArticlePagingData, AxiosError, ArticlePagingData>(
    ['articles', category, location, filterProgress],
    ({ pageParam }) => getGroupArticles(pageParam, category, location, filterProgress),
    {
      getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.nextId),
    }
  );

  const articles = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  return { articles, ...rest };
};

export default useFetchGroupArticles;
