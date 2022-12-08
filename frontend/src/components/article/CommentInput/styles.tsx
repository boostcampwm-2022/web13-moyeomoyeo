import styled from '@emotion/styled';

const CommentInputWrapper = styled.div`
  padding: 1.6rem;
  width: 100%;
  position: sticky;
  bottom: 0;
  background-color: ${({ theme }) => theme.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[2]};
`;

export { CommentInputWrapper };
