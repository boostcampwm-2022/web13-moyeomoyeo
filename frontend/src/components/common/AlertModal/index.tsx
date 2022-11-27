import styled from '@emotion/styled';
import { Modal } from '@mantine/core';

interface Props {
  message: string;
  open: boolean;
  onClose?: () => void;
}

const AlertModal = ({ message, open, onClose }: Props) => {
  return (
    <>
      {open && (
        <StyledModal opened={open} onClose={onClose} withCloseButton={false} centered>
          <ModalContent>{message}</ModalContent>
          <OkButton onClick={onClose}>확인</OkButton>
        </StyledModal>
      )}
    </>
  );
};

export default AlertModal;

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
