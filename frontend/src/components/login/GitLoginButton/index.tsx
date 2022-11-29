import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconBrandGithub } from '@tabler/icons';

const GitLoginButton = () => {
  const { white } = useTheme();

  const handleLogin = async () => {
    window.location.href = '/api/v1/auth/github/login';
  };

  return (
    <LoginButton onClick={handleLogin}>
      <IconBrandGithub color={white} />
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
  color: ${({ theme }) => theme.white};
  font-size: 1.6rem;
  font-weight: 800;
`;

export default GitLoginButton;
