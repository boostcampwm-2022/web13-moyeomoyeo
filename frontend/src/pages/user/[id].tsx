import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import Profile from '@components/common/Profile';
import ProfileLoading from '@components/common/ProfileLoading/ProfileLoading';
import { PAGE_TITLE } from '@constants/pageTitle';
import useFetchProfile from '@hooks/queries/useFetchProfile';

const UserProfile = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();
  const { profile, isFetching } = useFetchProfile(Number(id));

  return (
    <PageLayout
      header={
        <Header
          leftNode={
            <DetailTitle
              title={profile?.userName ?? '유저 프로필'}
              subTitle={PAGE_TITLE.USER.subTitle}
            />
          }
        />
      }
    >
      <ContentWrapper>
        <ProfileWrapper>
          {!isReady || isFetching ? <ProfileLoading /> : <Profile user={profile} />}
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
