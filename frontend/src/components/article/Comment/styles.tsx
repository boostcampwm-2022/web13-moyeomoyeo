import styled from '@emotion/styled';

const CommentWrapper = styled.div`
  width: 100%;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CommentUtils = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CommentUtilItem = styled.div`
  cursor: pointer;
`;

const CommentContent = styled.div`
  width: 100%;
`;

export {
  CommentWrapper,
  CommentHeader,
  CommentAuthor,
  CommentUtils,
  CommentUtilItem,
  CommentContent,
};
