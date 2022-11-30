import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { Modal } from '@mantine/core';

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
}

const RedirectHomeModal = ({ message, open, onClose }: Props) => {
  const router = useRouter();

  return (
    <>
      {open && (
        <StyledModal opened={open} onClose={onClose} withCloseButton={false} centered>
          <ModalContent>{message}</ModalContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <OkButton onClick={() => router.push('/login')}>로그인 페이지로 이동하기</OkButton>
        </StyledModal>
      )}
    </>
  );
};

export default RedirectHomeModal;

const StyledModal = styled(Modal)`
  & .mantine-Modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  padding: 1.6rem;
  text-align: center;
`;

const OkButton = styled.div`
  padding: 1.6rem;
  color: ${({ theme }) => theme.colors.indigo[7]};
  background-color: ${({ theme }) => theme.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
