import { AxiosError, AxiosResponse } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { ArticlePreviewType, ArticleType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

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

const getGroupArticles = async (
  currentPage: number,
  category: Category,
  location: Location,
  filterProgress: boolean
) => {
  const status = filterProgress ? ArticleStatus.PROGRESS : null;
  return clientAxios('/v1/group-articles/search', {
    params: { category, location, status, currentPage, countPerPage: 5 },
  });
};

const useFetchGroupArticles = (
  category: Category | null,
  location: Location | null,
  filterProgress: boolean
) => {
  const queryResult = useAuthInfiniteQuery<
    AxiosResponse<ArticleResponseType>,
    AxiosError,
    ArticleType[]
  >(
    ['articles', category, location, filterProgress],
    ({ pageParam = 1 }) => getGroupArticles(pageParam, category, location, filterProgress),
    {
      getNextPageParam: (lastPage: AxiosResponse<ArticleResponseType>) =>
        lastPage.data.data.totalPage === lastPage.data.data.currentPage
          ? undefined
          : lastPage.data.data.currentPage + 1,
    }
  );

  return { ...queryResult };
};

export default useFetchGroupArticles;
