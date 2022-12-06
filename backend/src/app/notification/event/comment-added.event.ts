import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { Comment } from '@src/app/comment/entity/comment.entity';

export class CommentAddedEvent {
  groupArticle: GroupArticle;
  comment: Comment;

  constructor(groupArticle: GroupArticle, comment: Comment) {
    this.groupArticle = groupArticle;
    this.comment = comment;
  }
}
