import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

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

const getMyParticipateArticles = async (currentPage: number) => {
  const {
    data: { data },
  } = await clientAxios.get<ArticleResponseType>('/v1/group-applications/me', {
    params: { currentPage, countPerPage: 8 },
  });
  return data;
};

const useFetchMyParticipateArticles = () => {
  const { data, ...rest } = useInfiniteQuery(
    ['articles', 'myparticipate'],
    ({ pageParam = 1 }) => getMyParticipateArticles(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.totalPage === lastPage.currentPage ? undefined : lastPage.currentPage + 1,
    }
  );

  const articles = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  return { articles, ...rest };
};

export default useFetchMyParticipateArticles;
