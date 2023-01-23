import Link from 'next/link';

import { Badge, Text } from '@mantine/core';

import Avatar from '@components/common/Avatar';
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
  newComment?: boolean;
  onDeleteComment?: () => void;
}

const Comment = ({ comment, newComment = false, onDeleteComment = () => {} }: Props) => {
  const { authorId, authorName, authorProfileImage, createdAt, contents } = comment;
  const { data: myData } = useFetchMyInfo();

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
              {newComment && <Badge radius="sm">새로운 댓글</Badge>}
            </CommentAuthor>
          </Link>
          <CommentUtils>
            {!newComment && myData?.id === authorId && (
              <CommentUtilItem onClick={onDeleteComment}>
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
    </>
  );
};

export default Comment;
