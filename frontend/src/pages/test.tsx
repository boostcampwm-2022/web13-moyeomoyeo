import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import useIntersect from '../hooks/useIntersect';
import PageLayout from '@components/common/PageLayout';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { TestResponseType } from '@typings/types';
import getTestData from '../apis/test/getTestData';

const useFetchTestData = () => {
  return useInfiniteQuery(['test'], async ({ pageParam = 0 }) => await getTestData(pageParam), {
    getNextPageParam: (lastPage: AxiosResponse<TestResponseType>) =>
      lastPage.data.isLast ? undefined : lastPage.data.currentId + 1,
  });
};

const Test = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchTestData();

  const testData = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.dataArr) : []),
    [data]
  );

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <PageLayout footer>
      {testData.map((data, index) => (
        <TestDiv key={index}>{data}</TestDiv>
      ))}
      <div ref={ref}></div>
    </PageLayout>
  );
};

const TestDiv = styled.div`
  height: 300px;
`;

export default Test;
