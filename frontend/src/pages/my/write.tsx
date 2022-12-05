import Link from 'next/link';
import { useMemo } from 'react';

import { AxiosResponse } from 'axios';

import styled from '@emotion/styled';

import EmptyMessage from '@components/common/EmptyMessage';
import GroupArticleCard from '@components/common/GroupArticleCard';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import { PAGE_TITLE } from '@constants/pageTitle';
import useFetchMyWriteArticles, {
  ArticleResponseType,
} from '@hooks/queries/useFetchMyWriteArticles';
import useIntersect from '@hooks/useIntersect';

const MyWriteArticlesPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchMyWriteArticles();

  const {
    OWN_GROUP: { title, subTitle },
  } = PAGE_TITLE;

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

  const articles = useMemo(
    () =>
      data
        ? data.pages.flatMap(
            (page) => (page as unknown as AxiosResponse<ArticleResponseType>).data.data.data
          )
        : [],
    [data]
  );

  return (
    <PageLayout header={<Header leftNode={<DetailTitle title={title} subTitle={subTitle} />} />}>
      <PageContentWrapper>
        {articles.length ? (
          <ArticleList>
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <div>
                  <GroupArticleCard article={article} />
                </div>
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

export default MyWriteArticlesPage;
