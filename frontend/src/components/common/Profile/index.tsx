import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, AvatarProps } from '@mantine/core';
import { IconBrandGithub, IconLink } from '@tabler/icons';

import { UserType } from '@typings/types';

interface Props {
  user: UserType;
}

const Profile = ({ user }: Props) => {
  const {
    colors: { gray },
  } = useTheme();

  const { userName, profileImage, description, githubUrl, blogUrl } = user;

  return (
    <ProfileWrapper>
      <StyledAvatar alt="avatar" src={profileImage} />
      <UserWrapper>
        <UserName>{userName}</UserName>
        <Description>{description}</Description>
      </UserWrapper>
      <UrlWrapper>
        <UrlIconWrapper>
          <IconBrandGithub color={gray[6]} />
          <Url href={githubUrl}>{githubUrl}</Url>
        </UrlIconWrapper>
        <UrlIconWrapper>
          <IconLink color={gray[6]} />
          <Url href={blogUrl}>{blogUrl}</Url>
        </UrlIconWrapper>
      </UrlWrapper>
    </ProfileWrapper>
  );
};
export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
`;

const StyledAvatar = styled(Avatar)<AvatarProps>`
  width: 8.4rem;
  height: 8.4rem;
  border-radius: 4.2rem;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

const Description = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[6]};
  max-width: 30rem;
  text-align: center;
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

const Url = styled.a`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray[6]};
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
