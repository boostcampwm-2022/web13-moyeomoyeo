import { AxiosError } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
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

export const getGroupArticles = async (
  currentPage: number,
  category: Category,
  location: Location,
  filterProgress: boolean
) => {
  const status = filterProgress ? ArticleStatus.PROGRESS : null;
  const {
    data: { data },
  } = await clientAxios<ArticleResponseType>('/v1/group-articles/search', {
    params: { category, location, status, currentPage, countPerPage: 5 },
  });
  return data;
};

const useFetchGroupArticles = (
  category: Category | null,
  location: Location | null,
  filterProgress: boolean
) => {
  const queryResult = useAuthInfiniteQuery<ArticlePagingData, AxiosError, ArticlePagingData>(
    ['articles', category, location, filterProgress],
    ({ pageParam = 1 }) => getGroupArticles(pageParam, category, location, filterProgress),
    {
      getNextPageParam: (lastPage) =>
        lastPage.totalPage === lastPage.currentPage ? undefined : lastPage.currentPage + 1,
    }
  );

  return { ...queryResult };
};

export default useFetchGroupArticles;
