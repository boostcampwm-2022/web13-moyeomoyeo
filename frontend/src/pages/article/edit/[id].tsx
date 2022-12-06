import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, Slider, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons';

import ArticlePostInput from '@components/article/ArticlePostInput';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import { CategoryKr } from '@constants/category';
import { LocationKr } from '@constants/location';
import { PAGE_TITLE } from '@constants/pageTitle';
import useEditMyArticle from '@hooks/queries/useEditMyArticle';
import useFetchMyArticle from '@hooks/queries/useFetchMyArticle';
import { ArticlePostType } from '@typings/types';
import { showToast } from '@utils/toast';

const ArticleEdit = () => {
  const router = useRouter();
  const articleId = Number(router.query.id);

  const { data: article } = useFetchMyArticle(articleId);
  const { mutate: editArticle } = useEditMyArticle();
  const [articleInput, setArticleInput] = useState<ArticlePostType>({
    title: '',
    contents: '',
    chatUrl: '',
    thumbnail: '',
  });
  const { title, contents, chatUrl, thumbnail } = articleInput;

  useEffect(() => {
    if (article) {
      const { title, contents, thumbnail, chatUrl } = article;
      setArticleInput({
        title,
        contents,
        chatUrl,
        thumbnail,
      });
    }
  }, [article]);

  const possibleToSubmit =
    article &&
    title.trim().length > 0 &&
    contents.length > 0 &&
    chatUrl.trim().length > 0 &&
    thumbnail;

  const handleClickSubmitBtn = async () => {
    if (!possibleToSubmit) return;
    editArticle(
      { articleId, articleInput },
      {
        onSuccess: () => {
          showToast({
            title: '게시글 수정 완료!',
            message: '이제 모집 완료 되기를 기다려주세요!',
          });
          router.back();
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>모여모여 - 모집 게시판</title>
      </Head>
      <PageLayout
        header={
          <Header
            leftNode={
              <DetailTitle
                title={PAGE_TITLE.ARTICLE.title}
                subTitle={PAGE_TITLE.ARTICLE.subTitle}
              />
            }
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
        {/* TODO 로딩처리 */}
        {article === undefined ? (
          <div>로딩중</div>
        ) : (
          <>
            <TermSection>
              <SelectSection>
                <DropDown
                  label="카테고리"
                  data={Object.entries(CategoryKr).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                  value={article.category}
                  required
                  disabled
                />
                <DropDown
                  label="장소"
                  data={Object.entries(LocationKr).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                  value={article.location}
                  required
                  disabled
                />
              </SelectSection>
              <PersonSection>
                <PersonSectionHeader>
                  <Text size="md" weight={500}>
                    인원제한
                  </Text>
                  <Text size="md" weight={500}>
                    {article.maxCapacity}명
                  </Text>
                </PersonSectionHeader>
                <Slider min={1} max={15} value={article.maxCapacity} disabled />
              </PersonSection>
            </TermSection>
            <ArticlePostInput
              values={articleInput}
              onChange={(target: keyof ArticlePostType, value: string) => {
                setArticleInput((prev) => ({ ...prev, [target]: value }));
              }}
            />
          </>
        )}
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

export default ArticleEdit;
