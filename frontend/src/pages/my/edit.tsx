import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, FileInput, Skeleton } from '@mantine/core';
import { IconCheck, IconUpload } from '@tabler/icons';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import TextInput from '@components/common/TextInput';
import useFetchMyData from '@hooks/queries/useFetchMyData';
import { UserType } from '@typings/types';

/**
 * TODO : 이미지 업로드 연동
 * 게시글 수정 API 연동
 */

const MyEditPage = () => {
  const { data: myData, isLoading } = useFetchMyData();

  const [userDataInput, setUserDataInput] = useState<Omit<UserType, 'id'>>({
    userName: '',
    profileImage: '',
    description: '',
    githubUrl: '',
    blogUrl: '',
  });
  const [userNameError, setUserNameError] = useState(false);
  const [githubUrlError, setGithubUrlError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const { id, ...rest } = myData;
      setUserDataInput({ ...rest });
    }
  }, [isLoading, myData]);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputUserName = e.target.value;
    setUserDataInput((prev) => ({ ...prev, userName: e.target.value }));
    setUserNameError(inputUserName.length > 10 || inputUserName.length === 0);
  };

  const handleGithubUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputGithubUrl = e.target.value;
    setUserDataInput((prev) => ({ ...prev, githubUrl: e.target.value }));
    setGithubUrlError(inputGithubUrl.length <= 0);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDescription = e.target.value;
    setUserDataInput((prev) => ({ ...prev, description: e.target.value }));
    setDescriptionError(inputDescription.length > 20);
  };

  return (
    <PageLayout>
      <Header
        leftNode={<DetailTitle title="프로필 수정" subTitle="자신의 프로필을 수정해보세요" />}
        rightNode={
          <ActionIcon variant="transparent" color={'gray'} onClick={() => alert('게시글 등록!')}>
            <IconCheck size={24} stroke={3} />
          </ActionIcon>
        }
      />
      <ProfileImageSection>
        {isLoading ? (
          <Skeleton height={120} circle />
        ) : (
          <ProfileImage src={myData.profileImage} alt="profile-image" width={120} height={120} />
        )}
      </ProfileImageSection>
      <InputsSections>
        <FileInput
          label="프로필 이미지"
          size="md"
          placeholder="이미지를 첨부해주세요 (최대 1장)"
          accept="image/*"
          icon={<IconUpload size={16} />}
          styles={{ label: { paddingBottom: '0.4rem' } }}
        />
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          value={userDataInput.userName}
          onChange={handleUserNameChange}
          error={
            userNameError &&
            (userDataInput.userName.length > 10
              ? '닉네임은 10자 이내로 입력해주세요'
              : '닉네임을 입력하세요')
          }
          required
        />
        <TextInput
          label="Github 링크"
          placeholder="Github 링크를 입력하세요"
          value={userDataInput.githubUrl}
          onChange={handleGithubUrlChange}
          required
          error={githubUrlError && 'Github 링크를 입력하세요'}
        />
        <TextInput
          label="블로그 링크"
          placeholder="블로그 링크를 입력하세요"
          value={userDataInput.blogUrl}
          onChange={(e) => setUserDataInput((prev) => ({ ...prev, blogUrl: e.target.value }))}
        />
        <TextInput
          label="한 줄 소개"
          placeholder="자신에 대해 한 줄로 소개해주세요"
          value={userDataInput.description}
          onChange={handleDescriptionChange}
          error={descriptionError && '한 줄 소개는 20자 이내로 입력해주세요'}
        />
      </InputsSections>
    </PageLayout>
  );
};

export default MyEditPage;

const ProfileImageSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2.4rem;
  margin-bottom: 1.6rem;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const InputsSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;
