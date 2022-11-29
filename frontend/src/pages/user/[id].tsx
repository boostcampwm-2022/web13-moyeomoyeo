import styled from '@emotion/styled';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import Profile from '@components/common/Profile';
import { dummyUser } from '@constants/dummy';
import { PAGE_TITLE } from '@constants/pageTitle';

const UserProfile = () => {
  return (
    <PageLayout
      header={
        <Header
          leftNode={<DetailTitle title={dummyUser.userName} subTitle={PAGE_TITLE.USER.subTitle} />}
        />
      }
    >
      <ContentWrapper>
        <ProfileWrapper>
          <Profile user={dummyUser} />
        </ProfileWrapper>
      </ContentWrapper>
    </PageLayout>
  );
};

export default UserProfile;

const ContentWrapper = styled.div`
  display: flex;
  padding: 1.6rem;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 1.2rem;
`;
