import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox } from '@mantine/core';
import { IconRefresh } from '@tabler/icons';

import DropDown from '@components/common/DropDown';
import EmptyMessage from '@components/common/EmptyMessage';
import GroupArticleCard from '@components/common/GroupArticleCard';
import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';
import UserLoginItem from '@components/common/Header/UserLoginItem';
import NavigationTab from '@components/common/NavigationTab';
import PageLayout from '@components/common/PageLayout';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import { PAGE_TITLE } from '@constants/pageTitle';
import useFetchGroupArticles from '@hooks/queries/useFetchGroupArticles';
import useIntersect from '@hooks/useIntersect';
import { ArticleType } from '@typings/types';

const Main = () => {
  const {
    colors: { gray },
  } = useTheme();
  const queryClient = useQueryClient();
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

  const articles: ArticleType[] = useMemo(
    // @ts-expect-error
    () => (data ? data.pages.flatMap(({ data }) => data.data.data) : []),
    [data]
  );

  const refreshArticleList = () => {
    void queryClient.resetQueries(['articles']);
  };

  return (
    <PageLayout
      header={
        <Header
          leftNode={
            <RootTitle title={PAGE_TITLE.ARTICLE.title} subTitle={PAGE_TITLE.ARTICLE.subTitle} />
          }
          rightNode={<UserLoginItem />}
        />
      }
      footer={<NavigationTab />}
      hasFloatingUtil
    >
      <ContentWrapper>
        <FilterWrapper>
          <DropDown
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
          <DropDown
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
        <RefreshWrapper>
          <Checkbox
            checked={progressChecked}
            onChange={(event) => setProgressChecked(event.currentTarget.checked)}
            label="모집 중인 모임만 보기"
            size="md"
          />
          <RefreshButton>
            <IconRefresh color={gray[6]} onClick={refreshArticleList} />
          </RefreshButton>
        </RefreshWrapper>
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
      </ContentWrapper>
    </PageLayout>
  );
};

export default Main;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const RefreshWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RefreshButton = styled.button`
  background-color: ${({ theme }) => theme.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.3rem;
`;
