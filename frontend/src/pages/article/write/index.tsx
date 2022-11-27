import Head from 'next/head';
import { useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, FileInput, Slider, Text } from '@mantine/core';
import { IconCheck, IconUpload, IconUser } from '@tabler/icons';

import ArticleEditor from '@components/article/ArticleEditor';
import ImageThumbnail from '@components/article/ImageThumbnail';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import TextInput from '@components/common/TextInput';
import { Category, CategoryKr } from '@constants/category';
import { Location, LocationKr } from '@constants/location';

/**
 * Todo
 * - 게시글 등록 API 연동
 * - 이미지 업로드 API 연동
 */

const WritePage = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [maxCapacity, setmaxCapacity] = useState<number>(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chatLink, setChatLink] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const possibleToSubmit =
    category &&
    location &&
    maxCapacity &&
    title.length > 0 &&
    content.length > 0 &&
    chatLink.length > 0 &&
    uploadedImage;

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
                onClick={() => alert('게시글 등록!')}
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
              onChange={(value) => setCategory(value as Category)}
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
              onChange={(value) => setLocation(value as Location)}
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
              onChange={setmaxCapacity}
            />
          </PersonSection>
        </TermSection>
        <PostSection>
          <TextInput
            label="제목"
            placeholder="제목을 입력해주세요."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ArticleEditor value={content} onChange={setContent} />
          <TextInput
            label="채팅방 링크"
            placeholder="채팅방 링크를 입력해주세요."
            required
            value={chatLink}
            onChange={(e) => setChatLink(e.target.value)}
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
            <ImageThumbnail src={uploadedImage && URL.createObjectURL(uploadedImage)} />
            <FileInput
              size="md"
              required
              placeholder="이미지를 첨부해주세요 (최대 1장)"
              accept="image/*"
              onChange={setUploadedImage}
              value={uploadedImage}
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
