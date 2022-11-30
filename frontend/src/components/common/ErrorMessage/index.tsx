import Link from 'next/link';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconZoomExclamation } from '@tabler/icons';

interface Props {
  errorCode?: number;
  title?: string;
  description?: string;
  subDescription?: string;
}

const ErrorMessage = ({ errorCode, title, description, subDescription }: Props) => {
  const {
    colors: { gray },
  } = useTheme();

  return (
    <MessageWrapper>
      <IconZoomExclamation width={64} height={64} color={gray[4]} />
      <ErrorCode>{errorCode}</ErrorCode>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <SubDescription>{subDescription}</SubDescription>
      <BackHomeButton>
        <Link href={'/'}>
          <BackHomeText>홈페이지로 돌아가기</BackHomeText>
        </Link>
      </BackHomeButton>
    </MessageWrapper>
  );
};

export default ErrorMessage;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorCode = styled.div`
  font-size: 6.4rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray[4]};
  margin-top: 0.8rem;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
  margin-top: 2.4rem;
  text-align: center;
`;

const Description = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  margin-top: 3.6rem;
  text-align: center;
`;

const SubDescription = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  text-align: center;
`;

const BackHomeButton = styled.div`
  margin-top: 3.6rem;
  background-color: ${({ theme }) => theme.white};
  border: none;
`;

const BackHomeText = styled.span`
  font-size: 1.6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.indigo[7]};
  &:hover {
    cursor: pointer;
  }
`;
