import styled from '@emotion/styled';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import GitLoginButton from '@components/login/GitLoginButton';
import LogoIcon from '@public/icons/logo-lg.svg';

const Login = () => {
  return (
    <PageLayout
      header={<Header leftNode={<DetailTitle title="로그인" subTitle="로그인을 해주세요." />} />}
    >
      <PageWrapper>
        <InfoWrapper>
          <LogoIcon />
          <TextWrapper>
            <Title>모여모여</Title>
            <SubTitle>개발자를 위한 모임 활성화 커뮤니티</SubTitle>
          </TextWrapper>
        </InfoWrapper>
        <GitLoginButton />
      </PageWrapper>
    </PageLayout>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  height: calc(100vh - 6.4rem - 3.2rem);
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Title = styled.span`
  font-size: 3.2rem;
  font-weight: 900;
`;

const SubTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.indigo[7]};
`;

export default Login;
