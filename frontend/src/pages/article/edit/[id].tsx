import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, FileInput, Slider, Text } from '@mantine/core';
import { IconCheck, IconUpload } from '@tabler/icons';

import ArticleEditor from '@components/article/ArticleEditor';
import ImageThumbnail from '@components/article/ImageThumbnail';
import AlertModal from '@components/common/AlertModal';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import TextInput from '@components/common/TextInput';
import { CategoryKr } from '@constants/category';
import { LocationKr } from '@constants/location';
import useEditMyArticle from '@hooks/queries/useEditMyArticle';
import useFetchArticle from '@hooks/queries/useFetchArticle';
import useAsyncError from '@hooks/useAsyncError';
import { ArticleInputType } from '@typings/types';
import { showToast } from '@utils/toast';
import uploadImage from '@utils/uploadImage';

const ArticleEdit = () => {
  const router = useRouter();
  const throwAsyncError = useAsyncError();

  const { article } = useFetchArticle(Number(router.query.id));
  // TODO url 받아와서 fill, 수정 기능 붙이기
  // const { url } = useFetchChatUrl(Number(router.query.id), true);
  const { mutate: editArticle } = useEditMyArticle();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [articleInput, setArticleInput] = useState<ArticleInputType>({
    title: '',
    content: '',
    chatUrl: '',
    thumbnail: '',
  });
  const { title, content, chatUrl, thumbnail } = articleInput;

  useEffect(() => {
    if (article) {
      const { title, content, thumbnail } = article;
      setArticleInput({
        title,
        content,
        // TODO 수정 필요
        chatUrl: 'test',
        thumbnail,
      });
    }
  }, [article]);

  const possibleToSubmit =
    article &&
    title.trim().length > 0 &&
    content.length > 0 &&
    chatUrl.trim().length > 0 &&
    thumbnail;

  const handleClickSubmitBtn = async () => {
    if (!possibleToSubmit) return;
    editArticle(
      { articleId: Number(router.query.id), articleInput },
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

  const handleChangeImage = async (imageFile: File) => {
    try {
      const uploadedImage = await uploadImage(imageFile);
      setArticleInput((prev) => ({ ...prev, thumbnail: uploadedImage.url }));
    } catch (err) {
      throwAsyncError('이미지 업로드에 실패했습니다.');
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
        <AlertModal
          message="게시글 등록이 완료되었습니다."
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
        />
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
            <PostSection>
              <TextInput
                label="제목"
                placeholder="제목을 입력해주세요."
                required
                value={title}
                onChange={(e) => setArticleInput((prev) => ({ ...prev, title: e.target.value }))}
              />
              <ArticleEditor
                value={content}
                onChange={(contents) => setArticleInput((prev) => ({ ...prev, content: contents }))}
              />
              <TextInput
                label="채팅방 링크"
                placeholder="채팅방 링크를 입력해주세요."
                required
                value={chatUrl}
                onChange={(e) => setArticleInput((prev) => ({ ...prev, chatUrl: e.target.value }))}
              />
              <ImageSection>
                <FileInputLabel>
                  <Text size="md" fw={500}>
                    썸네일 이미지
                  </Text>
                  <Text c="red" size="md">
                    *
                  </Text>
                </FileInputLabel>
                <ImageThumbnail src={thumbnail} />
                <FileInput
                  size="md"
                  required
                  placeholder="이미지를 첨부해주세요 (최대 1장)"
                  accept="image/*"
                  onChange={handleChangeImage}
                  icon={<IconUpload size={16} />}
                />
              </ImageSection>
            </PostSection>
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

const PostSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FileInputLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export default ArticleEdit;
