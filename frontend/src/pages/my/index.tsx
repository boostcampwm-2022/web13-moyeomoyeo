import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { IconFlag, IconPencil } from '@tabler/icons';

import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';
import NavigationTab from '@components/common/NavigationTab';
import PageLayout from '@components/common/PageLayout';
import Profile from '@components/common/Profile';
import { dummyUser } from '@constants/dummy';
import { PAGE_TITLE } from '@constants/pageTitle';

const My = () => {
  const {
    colors: { red, cyan },
  } = useTheme();

  return (
    <PageLayout
      // TODO 로그인 여부에 따라 rightNode 렌더링
      header={
        <Header
          leftNode={<RootTitle title={PAGE_TITLE.MY.title} subTitle={PAGE_TITLE.MY.subTitle} />}
        />
      }
      footer={<NavigationTab />}
    >
      <ContentWrapper>
        <ProfileWrapper>
          <Profile user={dummyUser} />
          <Button size="md" radius="md" color="indigo" fullWidth>
            프로필 수정하기
          </Button>
        </ProfileWrapper>
        <LinkButtonWrapper>
          <LinkButton>
            <WroteIcon>
              <IconPencil width={14} height={14} color={red[7]} />
            </WroteIcon>
            <ButtonTitle>내가 작성한 모임</ButtonTitle>
          </LinkButton>
          <Divider />
          <LinkButton>
            <ParticipatedIcon>
              <IconFlag width={14} height={14} color={cyan[7]} />
            </ParticipatedIcon>
            <ButtonTitle>내가 참여한 모임 </ButtonTitle>
          </LinkButton>
        </LinkButtonWrapper>
      </ContentWrapper>
    </PageLayout>
  );
};

export default My;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 1.2rem;
`;

const LinkButtonWrapper = styled.div`
  border: 0.1rem solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 1.2rem;
  overflow: hidden;
`;

const LinkButton = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.6rem;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray[1]};
  }
`;

const ButtonTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const WroteIcon = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.colors.red[0]};
  border-radius: 0.4rem;
`;

const ParticipatedIcon = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.colors.cyan[0]};
  border-radius: 0.4rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: ${({ theme }) => theme.colors.gray[2]};
`;
