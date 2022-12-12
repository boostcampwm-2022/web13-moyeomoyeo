import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { ActionIcon, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons';

import useAddComment from '@hooks/queries/useAddComment';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';
import { CommentType, PagingDataType } from '@typings/types';

import { CommentInputWrapper } from './styles';

interface Props {
  onAddComment: (comment: CommentType) => void;
}

const CommentInput = ({ onAddComment }: Props) => {
  const {
    query: { id },
  } = useRouter();

  const articleId = Number(id);
  const queryClient = useQueryClient();

  const { mutate: addComment } = useAddComment(articleId);
  const { data: myData } = useFetchMyInfo();
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = useCallback(() => {
    if (commentInput.trim().length > 0) {
      addComment(
        { contents: commentInput, articleId },
        {
          onSuccess: (res) => {
            const {
              data: {
                data: { id: commentId },
              },
            } = res;
            const {
              pages: {
                0: { totalCount: totalComments },
              },
            } = queryClient.getQueryData<InfiniteData<PagingDataType<unknown>>>([
              'comments',
              articleId,
            ]);

            if (totalComments > 5) {
              onAddComment({
                id: commentId,
                authorId: myData.id,
                authorName: myData.userName,
                authorProfileImage: myData.profileImage,
                contents: commentInput.trim(),
                createdAt: new Date().toUTCString(),
              });
            } else {
              setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 200);
            }
            setCommentInput('');
          },
        }
      );
    }
  }, [commentInput, articleId, addComment, queryClient, myData, onAddComment]);

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
