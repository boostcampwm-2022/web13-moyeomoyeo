import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconBrandGithub, IconLink } from '@tabler/icons';

import Avatar from '@components/common/Avatar';
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
      <Avatar alt={user.userName} src={profileImage} size="xl" priority />
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

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 2rem;
  font-weight: 700;
  word-break: break-all;
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
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[6]};
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
