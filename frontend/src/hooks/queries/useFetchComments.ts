import { useMemo } from 'react';

import { AxiosError } from 'axios';

import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { ApiResponseType, CommentType, PagingDataType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const getComments = async (currentPage: number, articleId: number) => {
  const {
    data: { data },
  } = await clientAxios.get<ApiResponseType<PagingDataType<CommentType[]>>>('/v1/comments', {
    params: {
      articleId,
      currentPage,
      countPerPage: 5,
    },
  });
  return data;
};

const useFetchComments = (articleId: number) => {
  const { data, ...rest } = useAuthInfiniteQuery<
    PagingDataType<CommentType[]>,
    AxiosError,
    PagingDataType<CommentType[]>
  >(['comments', articleId], ({ pageParam = 1 }) => getComments(pageParam, articleId), {
    getNextPageParam: (lastPage) =>
      lastPage.data.length === 0 ? undefined : lastPage.currentPage + 1,
  });

  const comments = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  return { comments, totalComments: data ? data.pages[0].totalCount : 0, ...rest };
};

export default useFetchComments;
