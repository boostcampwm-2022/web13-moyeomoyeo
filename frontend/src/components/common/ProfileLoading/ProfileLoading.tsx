import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Skeleton } from '@mantine/core';
import { IconBrandGithub, IconLink } from '@tabler/icons';

const ProfileLoading = () => {
  const {
    colors: { gray },
  } = useTheme();

  return (
    <ProfileWrapper>
      <Skeleton height={84} circle />
      <UserWrapper>
        <Skeleton height={24} width={60} />
        <Skeleton height={17} width={60} />
      </UserWrapper>
      <UrlWrapper>
        <UrlIconWrapper>
          <IconBrandGithub color={gray[6]} />
          <Skeleton height={14} width={200} />
        </UrlIconWrapper>
        <UrlIconWrapper>
          <IconLink color={gray[6]} />
          <Skeleton height={14} width={200} />
        </UrlIconWrapper>
      </UrlWrapper>
    </ProfileWrapper>
  );
};

export default ProfileLoading;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

const UrlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

const UrlIconWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;
