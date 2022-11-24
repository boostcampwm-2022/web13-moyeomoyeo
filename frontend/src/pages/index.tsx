import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Checkbox, Select } from '@mantine/core';
import styled from '@emotion/styled';
import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import NavigationTab from '@components/common/NavigationTab';
import RootTitle from '@components/common/Header/RootTitle';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import GroupArticleCard from '@components/common/GroupArticleCard';
import useIntersect from '@hooks/useIntersect';
import useFetchGroupArticles from '@hooks/queries/useFetchGroupArticles';
import { PAGE_TITLE } from '@constants/pageTitle';
import Index from '@components/common/NoGroupMessage';

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [progressChecked, setProgressChecked] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchGroupArticles(
    selectedCategory,
    selectedLocation,
    progressChecked
  );

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

  const articles = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.articles) : []),
    [data]
  );

  return (
    <PageLayout
      header={
        <Header
          leftNode={
            <RootTitle title={PAGE_TITLE.ARTICLE.title} subTitle={PAGE_TITLE.ARTICLE.subTitle} />
          }
        />
      }
      footer={<NavigationTab />}
      hasFloatingUtil
    >
      <ContentWrapper>
        <FilterWrapper>
          <StyledSelect
            label="카테고리"
            data={[
              { value: null, label: '전체' },
              ...Object.values(Category).map((category) => ({
                value: category,
                label: CategoryKr[category],
              })),
            ]}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value as Category)}
            size="md"
            maxDropdownHeight={200}
          />
          <StyledSelect
            label="장소"
            data={[
              { value: null, label: '전체' },
              ...Object.values(Location).map((location) => ({
                value: location,
                label: LocationKr[location],
              })),
            ]}
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value as Location)}
            size="md"
            maxDropdownHeight={200}
          />
        </FilterWrapper>
        <Checkbox
          checked={progressChecked}
          onChange={(event) => setProgressChecked(event.currentTarget.checked)}
          label="모집 중인 모임만 보기"
          size="md"
        />
        {articles.length ? (
          <ArticleList>
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <div key={article.id}>
                  <GroupArticleCard article={article} />
                </div>
              </Link>
            ))}
            <div ref={ref}></div>
          </ArticleList>
        ) : (
          <Index />
        )}
      </ContentWrapper>
    </PageLayout>
  );
};

export default Main;

// TODO 공통 Dropdown 컴포넌트로 변경
const StyledSelect = styled(Select)`
  width: 100%;
  & .mantine-Select-item {
    padding: 1.2rem 1.6rem;
    &[data-selected] {
      &, &:hover {
        background-color: ${({ theme }) => theme.colors.indigo[0]};
        color: ${({ theme }) => theme.colors.indigo[7]};
      },
    },
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.3rem;
`;
