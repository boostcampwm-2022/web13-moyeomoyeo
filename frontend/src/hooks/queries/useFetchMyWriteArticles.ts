import { useMemo } from 'react';

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
    params: { currentPage, countPerPage: 8 },
  });
  return data;
};

const useFetchMyWriteArticles = () => {
  const { data, ...rest } = useAuthInfiniteQuery<ArticlePagingData, AxiosError, ArticlePagingData>(
    ['articles', 'mywrite'],
    ({ pageParam = 1 }) => getMyWriteArticles(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.length === 0 ? undefined : lastPage.currentPage + 1,
    }
  );

  const articles = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  return { articles, ...rest };
};

export default useFetchMyWriteArticles;
