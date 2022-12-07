import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Text } from '@mantine/core';

import Avatar from '@components/common/Avatar';
import ConfirmModal from '@components/common/ConfirmModal';
import useDeleteComment from '@hooks/queries/useDeleteComment';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';
import { CommentType } from '@typings/types';
import dateTimeFormat from '@utils/dateTime';

import {
  CommentAuthor,
  CommentContent,
  CommentHeader,
  CommentUtilItem,
  CommentUtils,
  CommentWrapper,
} from './styles';

interface Props {
  /**
   * 댓글 정보를 입력합니다.
   */
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  const router = useRouter();
  const articleId = Number(router.query.id);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { id: commentId, authorId, authorName, authorProfileImage, createdAt, contents } = comment;
  const { data: myData } = useFetchMyInfo();
  const { mutate: deleteComment } = useDeleteComment(articleId);

  return (
    <>
      <CommentWrapper>
        <CommentHeader>
          <Link href={`/user/${authorId}`}>
            <CommentAuthor>
              <Avatar size="sm" src={authorProfileImage} alt={authorName} />
              <Text fz="md" fw={500}>
                {authorName}
              </Text>
              <Text fz="sm" fw={300} c="gray.4">
                {dateTimeFormat(createdAt)}
              </Text>
            </CommentAuthor>
          </Link>
          <CommentUtils>
            {myData?.id === authorId && (
              <CommentUtilItem onClick={() => setConfirmModalOpen(true)}>
                <Text fz="sm" fw={500} c="gray.4">
                  삭제
                </Text>
              </CommentUtilItem>
            )}
          </CommentUtils>
        </CommentHeader>
        <CommentContent>
          <Text fz="lg" fw={500}>
            {contents}
          </Text>
        </CommentContent>
      </CommentWrapper>
      <ConfirmModal
        message="댓글을 삭제하시겠습니까?"
        open={confirmModalOpen}
        onConfirmButtonClick={() => deleteComment(commentId)}
        onCancelButtonClick={() => setConfirmModalOpen(false)}
      />
    </>
  );
};

export default Comment;
