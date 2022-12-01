import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, FileInput, Slider, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconUpload, IconUser } from '@tabler/icons';

import ArticleEditor from '@components/article/ArticleEditor';
import ImageThumbnail from '@components/article/ImageThumbnail';
import AlertModal from '@components/common/AlertModal';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import TextInput from '@components/common/TextInput';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';
import useAsyncError from '@hooks/useAsyncError';
import { ImageUploadType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';
import uploadImage from '@utils/uploadImage';

interface ArticleInput {
  category: Category | null;
  location: Location | null;
  maxCapacity: number;
  title: string;
  contents: string;
  chatUrl: string;
  uploadedImage: ImageUploadType | null;
}

const WritePage = () => {
  const router = useRouter();
  const throwError = useAsyncError();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [articleInput, setArticleInput] = useState<ArticleInput>({
    category: null,
    location: null,
    maxCapacity: 5,
    title: '',
    contents: '',
    chatUrl: '',
    uploadedImage: null,
  });
  const { category, location, maxCapacity, title, contents, chatUrl, uploadedImage } = articleInput;

  const possibleToSubmit =
    category &&
    location &&
    maxCapacity &&
    title.trim().length > 0 &&
    contents.length > 0 &&
    chatUrl.trim().length > 0 &&
    uploadedImage;

  const handleClickSubmitBtn = async () => {
    if (!possibleToSubmit) return;
    try {
      const { uploadedImage, ...rest } = articleInput;
      await clientAxios.post('/v1/group-articles', {
        ...rest,
        thumbnail: uploadedImage.key,
      });
      // TODO : mutation 로직 추가?
      // Modal, notification 중 고르기
      showNotification({
        color: 'indigo',
        title: '게시글 등록 완료!',
        message: '이제 모집 완료 되기를 기다려주세요!',
        icon: <IconCheck size={16} />,
        autoClose: 5000,
        styles: (theme) => ({
          root: {
            paddingTop: '1.6rem',
            paddingBottom: '1.6rem',
          },
          title: {
            fontSize: theme.fontSizes.lg,
            fontWeight: 700,
          },
        }),
      });
      void router.push('/');
    } catch (err) {
      throwError('게시글 등록에 실패했습니다.');
    }
  };

  const handleChangeImage = async (imageFile: File) => {
    try {
      const uploadedImage = await uploadImage(imageFile);
      setArticleInput((prev) => ({ ...prev, uploadedImage }));
    } catch (err) {
      throwError('이미지 업로드에 실패했습니다.');
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
        <PostSection>
          <TextInput
            label="제목"
            placeholder="제목을 입력해주세요."
            required
            value={title}
            onChange={(e) => setArticleInput((prev) => ({ ...prev, title: e.target.value }))}
          />
          <ArticleEditor
            value={contents}
            onChange={(contents) => setArticleInput((prev) => ({ ...prev, contents }))}
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
            <ImageThumbnail src={uploadedImage?.url} />
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

export default WritePage;
