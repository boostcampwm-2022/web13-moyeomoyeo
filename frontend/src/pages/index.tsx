import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox, Select } from '@mantine/core';
import { IconRefresh } from '@tabler/icons';

import Test from '@components/Test';
import ArticleList from '@components/article/ArticleList';
import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';
import NavigationTab from '@components/common/NavigationTab';
import PageLayout from '@components/common/PageLayout';
import ApiErrorBoundary from '@components/error/ApiErrorBoundary';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import { PAGE_TITLE } from '@constants/pageTitle';

const Main = () => {
  const {
    colors: { gray },
  } = useTheme();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [progressChecked, setProgressChecked] = useState<boolean>(false);

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
        {/* TODO 테스트를 위해 작성, 추후 Test 제거 */}
        <ApiErrorBoundary>
          <Test />
        </ApiErrorBoundary>
        <ApiErrorBoundary>
          <ArticleList />
        </ApiErrorBoundary>
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
      &,
      &:hover {
        background-color: ${({ theme }) => theme.colors.indigo[0]};
        color: ${({ theme }) => theme.colors.indigo[7]};
      }
    }
  }
`;

const ContentWrapper = styled.div`
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
