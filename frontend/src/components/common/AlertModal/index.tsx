import { Modal } from '@mantine/core';
import styled from '@emotion/styled';

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
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;
  }
`;

const ModalContent = styled.div`
  padding: 1.6rem;
`;

const OkButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 1.6rem;
  color: ${({ theme }) => theme.colors.indigo[7]};
  background-color: ${({ theme }) => theme.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
