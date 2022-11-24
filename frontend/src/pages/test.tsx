import { useMemo } from 'react';
import styled from '@emotion/styled';
import useIntersect from '@hooks/useIntersect';
import PageLayout from '@components/common/PageLayout';
import useFetchTestData from '@hooks/queries/useFetchTestData';

const Test = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchTestData();

  const testData = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.dataArr) : []),
    [data]
  );

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
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

// TODO SSR 적용
// export const getServerSideProps = async () => {
//   console.log('hesr');
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery(['test'], async () => await getTestData(0), {
//     staleTime: 1000,
//   });
//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// };

export default Test;
