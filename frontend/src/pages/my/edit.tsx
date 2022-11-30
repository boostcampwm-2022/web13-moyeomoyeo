import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, FileInput, Skeleton } from '@mantine/core';
import { IconCheck, IconUpload } from '@tabler/icons';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import TextInput from '@components/common/TextInput';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';
import { UserType } from '@typings/types';

/**
 * TODO : 이미지 업로드 연동
 * 게시글 수정 API 연동
 */

const MyEditPage = () => {
  const { data: myProfile } = useFetchMyInfo();

  const [userDataInput, setUserDataInput] = useState<Omit<UserType, 'id'>>({
    userName: '',
    profileImage: '',
    description: '',
    githubUrl: '',
    blogUrl: '',
  });

  useEffect(() => {
    if (myProfile) {
      const { id, ...rest } = myProfile;
      setUserDataInput({ ...rest });
    }
  }, [myProfile]);

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataInput((prev) => ({ ...prev, [name]: value }));
  };

  if (!myProfile) return null;

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
        {!myProfile ? (
          <Skeleton height={120} circle />
        ) : (
          <ProfileImage src={myProfile.profileImage} alt="profile-image" width={120} height={120} />
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
          required
          name="userName"
          label="닉네임 (필수, 최대 10자)"
          placeholder="닉네임을 입력하세요"
          value={userDataInput.userName}
          onChange={handleUserDataChange}
          error={userDataInput.userName.length <= 0 && '닉네임은 필수입니다'}
          maxLength={10}
        />
        <TextInput
          required
          disabled
          label="Github 링크"
          placeholder="Github 링크를 입력하세요"
          value={userDataInput.githubUrl}
        />
        <TextInput
          label="블로그 링크"
          name="blogUrl"
          placeholder="블로그 링크를 입력하세요"
          value={userDataInput.blogUrl}
          onChange={handleUserDataChange}
        />
        <TextInput
          label="한 줄 소개 (최대 20자)"
          name="description"
          placeholder="자신에 대해 한 줄로 소개해주세요"
          onChange={handleUserDataChange}
          value={userDataInput.description}
          maxLength={20}
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
  padding-bottom: 1.6rem;
`;
