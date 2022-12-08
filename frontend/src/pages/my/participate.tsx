import Link from 'next/link';

import styled from '@emotion/styled';

import ArticleListLoading from '@components/common/ArticleListLoading';
import EmptyMessage from '@components/common/EmptyMessage';
import GroupArticleCard from '@components/common/GroupArticleCard';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import useFetchMyParticipateArticles from '@hooks/queries/useFetchMyParticipateArticles';
import useIntersect from '@hooks/useIntersect';

const MyParcipatePage = () => {
  const { articles, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchMyParticipateArticles();

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

  return (
    <PageLayout
      header={
        <Header
          leftNode={
            <DetailTitle title="내가 참여한 모임" subTitle="내가 참여한 모임들을 확인해보세요" />
          }
        />
      }
    >
      <PageContentWrapper>
        {isLoading ? (
          <ArticleList>
            <ArticleListLoading />
          </ArticleList>
        ) : articles.length ? (
          <ArticleList>
            {articles.map((article) => (
              <Link href={`/article/${article.id}`} key={article.id}>
                <CardLink>
                  <GroupArticleCard article={article} />
                </CardLink>
              </Link>
            ))}
            <div ref={ref}></div>
          </ArticleList>
        ) : (
          <EmptyMessage target="article" large />
        )}
      </PageContentWrapper>
    </PageLayout>
  );
};

const PageContentWrapper = styled.div`
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.3rem;
`;

const CardLink = styled.div`
  overflow: auto;
`;

export default MyParcipatePage;
