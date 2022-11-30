import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconMoodEmpty } from '@tabler/icons';

interface Props {
  target: 'article' | 'participant';
  large?: boolean;
}

const targetKr = {
  article: '모임이',
  participant: '신청자가',
};

const EmptyMessage = ({ target, large }: Props) => {
  const {
    colors: { gray },
  } = useTheme();

  return (
    <MessageWrapper>
      <IconMoodEmpty width={large ? 64 : 48} height={large ? 64 : 48} color={gray[6]} />
      <Message large={large}>{targetKr[target]} 존재하지 않아요</Message>
    </MessageWrapper>
  );
};

export default EmptyMessage;

const MessageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div<{ large: boolean }>`
  font-size: ${(props) => (props.large ? '2rem' : '1.5rem')};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray[6]};
`;
