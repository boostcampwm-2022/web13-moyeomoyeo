import GithubLogoIcon from '@public/icons/githubLogo.svg';
import styled from '@emotion/styled';

const GitLoginButton = () => {
  return (
    <LoginButton>
      <GithubLogoIcon />
      <GithubLoginText>Github로 로그인</GithubLoginText>
    </LoginButton>
  );
};

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
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.dark[4]};
  }
`;

const GithubLoginText = styled.span`
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 800;
`;

export default GitLoginButton;
