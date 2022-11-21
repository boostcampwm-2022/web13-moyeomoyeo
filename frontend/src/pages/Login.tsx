import styled from '@emotion/styled';
import LogoIcon from '@public/icons/logo.svg';
import GithubLogoIcon from '@public/icons/githubLogo.svg';

const Login = () => {
  return (
    <PageWrapper>
      <InfoWrapper>
        <LogoIcon />
        <TextWrapper>
          <Title>모여모여</Title>
          <SubTitle>개발자를 위한 모임 활성화 커뮤니티</SubTitle>
        </TextWrapper>
      </InfoWrapper>
      <LoginButton>
        <GithubLogoIcon />
        <GithubLoginText>Github로 로그인</GithubLoginText>
      </LoginButton>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  height: 100vh;
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

const LoginButton = styled.button`
  display: flex;
  gap: 0.8rem;
  width: 34.2rem;
  height: 5.6rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark[9]};
  border: none;
  border-radius: 8px;
`;

const GithubLoginText = styled.span`
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 800;
`;

export default Login;
