import Link from 'next/link';

import styled from '@emotion/styled';

import ArticleListLoading from '@components/common/ArticleListLoading';
import EmptyMessage from '@components/common/EmptyMessage';
import GroupArticleCard from '@components/common/GroupArticleCard';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import { PAGE_TITLE } from '@constants/pageTitle';
import useFetchMyWriteArticles from '@hooks/queries/useFetchMyWriteArticles';
import useIntersect from '@hooks/useIntersect';

const MyWriteArticlesPage = () => {
  const { articles, fetchNextPage, hasNextPage, isFetching, isLoading } = useFetchMyWriteArticles();

  const {
    OWN_GROUP: { title, subTitle },
  } = PAGE_TITLE;

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

  return (
    <PageLayout header={<Header leftNode={<DetailTitle title={title} subTitle={subTitle} />} />}>
      <ContentWrapper>
        {isLoading ? (
          <ArticleList>
            <ArticleListLoading />
          </ArticleList>
        ) : articles.length ? (
          <ArticleList>
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
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
      </ContentWrapper>
    </PageLayout>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.3rem;
`;

const CardLink = styled.div`
  overflow: auto;
`;

export default MyWriteArticlesPage;
