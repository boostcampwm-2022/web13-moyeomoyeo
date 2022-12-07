import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons';

import useAddComment from '@hooks/queries/useAddComment';

import { CommentInputWrapper } from './styles';

const CommentInput = () => {
  const {
    query: { id },
  } = useRouter();

  const articleId = Number(id);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: addComment } = useAddComment(articleId);

  const handleAddComment = () => {
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      addComment({ contents: inputRef.current.value, articleId });
      inputRef.current.value = '';
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
    }
  };

  const handlePressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handlePressEnter);

    return () => {
      window.removeEventListener('keypress', handlePressEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommentInputWrapper>
      <TextInput
        size="md"
        placeholder="댓글을 입력해주세요."
        ref={inputRef}
        rightSection={
          <ActionIcon variant="transparent" color="indigo" onClick={handleAddComment}>
            <IconSend size={24} />
          </ActionIcon>
        }
        rightSectionWidth={48}
      />
    </CommentInputWrapper>
  );
};

export default CommentInput;
