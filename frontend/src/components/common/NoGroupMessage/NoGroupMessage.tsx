import styled from '@emotion/styled';
import { IconMoodEmpty } from '@tabler/icons';
import { useTheme } from '@emotion/react';

const NoGroupMessage = () => {
  const {
    colors: { gray },
  } = useTheme();

  return (
    <MessageWrapper>
      <IconMoodEmpty width={64} height={64} color={gray[6]} />
      <Message>모임이 존재하지 않아요</Message>
    </MessageWrapper>
  );
};

export default NoGroupMessage;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: center;
  align-items: center;
`;

const Message = styled.span`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray[6]};
`;
