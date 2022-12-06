import styled from '@emotion/styled';
import { Modal } from '@mantine/core';

interface Props {
  message: string;
  open: boolean;
  onConfirmButtonClick: () => void;
  onCancelButtonClick: () => void;
}

const ConfirmModal = ({ message, open, onConfirmButtonClick, onCancelButtonClick }: Props) => {
  return (
    <>
      {open && (
        <StyledModal opened={open} onClose={onCancelButtonClick} withCloseButton={false} centered>
          <ModalContent>{message}</ModalContent>
          <ButtonWrapper>
            <ActionButton onClick={onConfirmButtonClick}>확인</ActionButton>
            <ActionButton onClick={onCancelButtonClick}>취소</ActionButton>
          </ButtonWrapper>
        </StyledModal>
      )}
    </>
  );
};

export default ConfirmModal;

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 3.6rem;
  justify-content: center;
  width: 100%;
`;

const ActionButton = styled.div`
  text-align: center;
  padding: 1.6rem;
  color: ${({ theme }) => theme.colors.indigo[7]};
  background-color: ${({ theme }) => theme.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
