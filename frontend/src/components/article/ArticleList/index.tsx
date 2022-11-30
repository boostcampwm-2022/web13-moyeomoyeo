import Link from 'next/link';
import { useMemo } from 'react';

import styled from '@emotion/styled';

import EmptyMessage from '@components/common/EmptyMessage';
import GroupArticleCard from '@components/common/GroupArticleCard';
import { ArticleStatus } from '@constants/article';
import useFetchGroupArticles from '@hooks/queries/useFetchGroupArticles';
import useIntersect from '@hooks/useIntersect';
import { ArticleType } from '@typings/types';

const ArticleList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchGroupArticles(
    null,
    null,
    ArticleStatus.PROGRESS
  );
  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

  const articles: ArticleType[] = useMemo(
    // @ts-expect-error
    () => (data ? data.pages.flatMap(({ data }) => data.data.data) : []),
    [data]
  );

  // TODO 로딩 처리
  if (isFetching) return <div>test</div>;

  return (
    <>
      {articles.length > 0 ? (
        <ListWrapper>
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div key={article.id}>
                <GroupArticleCard article={article} />
              </div>
            </Link>
          ))}
          <div ref={ref}></div>
        </ListWrapper>
      ) : (
        <EmptyMessage target="article" large />
      )}
    </>
  );
};
const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.3rem;
`;

export default ArticleList;
