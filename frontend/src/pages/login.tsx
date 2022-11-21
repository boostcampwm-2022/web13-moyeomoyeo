import styled from '@emotion/styled';
import LogoIcon from '@public/icons/logo-lg.svg';
import PageLayout from '@components/common/PageLayout';
import GitLoginButton from '@components/gitLoginButton';

const Login = () => {
  return (
    <PageLayout>
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
  height: 100%;
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
