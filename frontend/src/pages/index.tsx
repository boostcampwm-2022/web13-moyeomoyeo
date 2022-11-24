import { Checkbox, Select } from '@mantine/core';
import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import NavigationTab from '@components/common/NavigationTab';
import RootTitle from '@components/common/Header/RootTitle';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import GroupArticleCard from '@components/GroupArticleCard';
import { dummyArticle } from '@constants/dummy';

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <PageLayout
      header={
        <Header
          leftNode={<RootTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />}
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
        <Checkbox label="모집 중인 모임만 보기" size="md" />
        <ArticleList>
          {Array.from({ length: 20 })
            .fill(0)
            .map((_, index) => (
              <GroupArticleCard key={index} article={dummyArticle} />
            ))}
        </ArticleList>
      </ContentWrapper>
    </PageLayout>
  );
};

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

export default Main;
