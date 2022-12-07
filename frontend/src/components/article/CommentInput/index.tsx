import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons';

import useAddComment from '@hooks/queries/useAddComment';

import { CommentInputWrapper } from './styles';

const CommentInput = () => {
  const {
    query: { id },
  } = useRouter();

  const articleId = Number(id);

  const { mutate: addComment } = useAddComment(articleId);
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = useCallback(() => {
    if (commentInput.trim().length > 0) {
      addComment(
        { contents: commentInput, articleId },
        {
          onSuccess: () => {
            setCommentInput('');
            setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 200);
          },
        }
      );
    }
  }, [commentInput, articleId, addComment]);

  const handlePressEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAddComment();
      }
    },
    [handleAddComment]
  );

  useEffect(() => {
    window.addEventListener('keypress', handlePressEnter);

    return () => {
      window.removeEventListener('keypress', handlePressEnter);
    };
  }, [handlePressEnter]);

  return (
    <CommentInputWrapper>
      <TextInput
        size="md"
        placeholder="댓글을 입력해주세요."
        value={commentInput}
        onChange={(e) => setCommentInput(e.currentTarget.value)}
        rightSection={
          <ActionIcon
            variant="transparent"
            color="indigo"
            onClick={handleAddComment}
            disabled={commentInput.trim().length === 0}
          >
            <IconSend size={24} />
          </ActionIcon>
        }
        rightSectionWidth={48}
      />
    </CommentInputWrapper>
  );
};

export default CommentInput;
