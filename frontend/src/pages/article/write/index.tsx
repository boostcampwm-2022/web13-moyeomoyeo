import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, Slider, Text } from '@mantine/core';
import { IconCheck, IconUser } from '@tabler/icons';

import ArticlePostInput from '@components/article/ArticlePostInput';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import useAsyncError from '@hooks/useAsyncError';
import { ArticlePostInputType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';
import { showToast } from '@utils/toast';

interface ArticleInputType {
  category: Category | null;
  location: Location | null;
  maxCapacity: number;
  title: string;
  contents: string;
  chatUrl: string;
  thumbnail: string | null;
}

const WritePage = () => {
  const router = useRouter();
  const throwAsyncError = useAsyncError();

  const [articleInput, setArticleInput] = useState<ArticleInputType>({
    category: null,
    location: null,
    maxCapacity: 5,
    title: '',
    contents: '',
    chatUrl: '',
    thumbnail: null,
  });
  const { category, location, maxCapacity, title, contents, chatUrl, thumbnail } = articleInput;

  const possibleToSubmit =
    category &&
    location &&
    maxCapacity &&
    title.trim().length > 0 &&
    contents.length > 0 &&
    chatUrl.trim().length > 0 &&
    thumbnail;

  const handleClickSubmitBtn = async () => {
    if (!possibleToSubmit) return;
    try {
      await clientAxios.post('/v1/group-articles', articleInput);
      showToast({
        title: '게시글 등록 완료!',
        message: '이제 모집 완료 되기를 기다려주세요!',
      });

      void router.push('/');
    } catch (err) {
      throwAsyncError('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Head>
        <title>모여모여 - 모집 게시판</title>
      </Head>
      <PageLayout
        header={
          <Header
            leftNode={<DetailTitle title="모집게시판" subTitle="다양한 소모임을 위한 게시판" />}
            rightNode={
              <ActionIcon
                variant="transparent"
                color={possibleToSubmit ? 'indigo' : 'gray'}
                onClick={handleClickSubmitBtn}
              >
                <IconCheck size={24} stroke={3} />
              </ActionIcon>
            }
          />
        }
      >
        <TermSection>
          <SelectSection>
            <DropDown
              label="카테고리"
              placeholder="카테고리 선택하기"
              data={Object.entries(CategoryKr).map(([key, value]) => ({
                label: value,
                value: key,
              }))}
              value={category}
              onChange={(value) =>
                setArticleInput((prev) => ({ ...prev, category: value as Category }))
              }
              required
            />
            <DropDown
              label="장소"
              placeholder="장소 선택하기"
              data={Object.entries(LocationKr).map(([key, value]) => ({
                label: value,
                value: key,
              }))}
              value={location}
              onChange={(location) =>
                setArticleInput((prev) => ({ ...prev, location: location as Location }))
              }
              required
            />
          </SelectSection>
          <PersonSection>
            <PersonSectionHeader>
              <Text size="md" weight={500}>
                인원제한
              </Text>
              <Text size="md" weight={500}>
                {maxCapacity}명
              </Text>
            </PersonSectionHeader>
            <Slider
              thumbChildren={<IconUser size={16} />}
              thumbSize={26}
              styles={{ thumb: { borderWidth: 2, padding: 3 } }}
              label={null}
              min={1}
              max={15}
              value={maxCapacity}
              onChange={(maxCapacity) => setArticleInput((prev) => ({ ...prev, maxCapacity }))}
            />
          </PersonSection>
        </TermSection>
        <ArticlePostInput
          values={{
            title,
            thumbnail,
            chatUrl,
            contents,
          }}
          onChange={(target: keyof ArticlePostInputType, value: string) => {
            setArticleInput((prev) => ({ ...prev, [target]: value }));
          }}
        />
      </PageLayout>
    </>
  );
};

const TermSection = styled.div`
  padding: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
  display: flex;
  flex-direction: column;
  gap: 1.6rem; ;
`;

const SelectSection = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
`;

const PersonSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PersonSectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default WritePage;
