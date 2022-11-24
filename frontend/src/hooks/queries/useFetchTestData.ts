import { useInfiniteQuery } from '@tanstack/react-query';
import getTestData from '@apis/test/getTestData';
import { AxiosResponse } from 'axios';
import { TestResponseType } from '@typings/types';

const useFetchTestData = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery(
    ['test'],
    ({ pageParam = 0 }) => getTestData(pageParam),
    {
      getNextPageParam: (lastPage: AxiosResponse<TestResponseType>) =>
        lastPage.data.isLast ? undefined : lastPage.data.currentId + 1,
    }
  );
  if (isError) {
    // TODO 에러 처리 공통 로직 적용
  }
  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchTestData;
