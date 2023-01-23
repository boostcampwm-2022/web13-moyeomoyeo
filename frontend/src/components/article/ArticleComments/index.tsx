import Comment from '@components/article/Comment';
import Joiner from '@components/common/Joiner';
import { modals } from '@components/common/Modals';
import useDeleteComment from '@hooks/queries/useDeleteComment';
import useModals from '@hooks/useModals';
import { CommentType } from '@typings/types';

interface Props {
  comments: CommentType[];
  articleId: number;
}

const ArticleComments = ({ comments, articleId }: Props) => {
  const { openModal, closeModal } = useModals();
  const { mutate: deleteComment } = useDeleteComment(articleId);
  return (
    <Joiner
      {...(comments.length > 0 && { before: true })}
      components={comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDeleteComment={() =>
            openModal<typeof modals.confirm>(modals.confirm, {
              message: '댓글을 삭제하시겠습니까?',
              onConfirmButtonClick: () => {
                deleteComment(comment.id);
                closeModal(modals.confirm);
              },
              onCancelButtonClick: () => closeModal(modals.confirm),
            })
          }
        />
      ))}
    />
  );
};

export default ArticleComments;
