import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

import { UserType } from '@typings/types';

interface Props {
  participant: Partial<UserType>;
}

const ParticipantItem = ({ participant }: Props) => {
  const {
    colors: { gray },
  } = useTheme();
  const { userName, profileImage, description } = participant;

  return (
    <ItemWrapper>
      <ProfileWrapper>
        <Avatar radius="xl" size="md" alt="avatar" src={profileImage} />
        <ProfileTextWrapper>
          <Name>{userName}</Name>
          <IntroduceText>{description}</IntroduceText>
        </ProfileTextWrapper>
      </ProfileWrapper>
      {/* TODO 클릭 시 유저 프로필 페이지로 이동 */}
      <ProfileLinkButton>
        <IconExternalLink color={gray[6]} />
      </ProfileLinkButton>
    </ItemWrapper>
  );
};

export default ParticipantItem;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const IntroduceText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

const ProfileLinkButton = styled.div`
  background-color: ${({ theme }) => theme.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
