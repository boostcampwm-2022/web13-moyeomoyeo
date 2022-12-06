import { Injectable } from '@nestjs/common';
import { CommnetRepository } from '@app/comment/comment.repository';
import { CommentWritingRequest } from '@app/comment/dto/comment-writing-request.dto';
import { User } from '@app/user/entity/user.entity';
import { Comment } from '@app/comment/entity/comment.entity';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { GroupNotFoundException } from '@app/comment/exception/group-not-found.exception';
import { CommentNotFoundException } from '@app/comment/exception/comment-not-found.exception';
import { NotAuthorException } from '@app/comment/exception/not-author.exception';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommnetRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
  ) {}

  async writeComment(user: User, commentWritingRequest: CommentWritingRequest) {
    this.validateArticle(commentWritingRequest.articleId);

    const comment = Comment.from(
      user,
      commentWritingRequest.articleId,
      commentWritingRequest.contents,
    );
    return await this.commentRepository.save(comment);
  }

  async validateArticle(articleId: number) {
    const groupArticle = await this.groupArticleRepository.findById(articleId);
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
  }

  async deleteComment(user: User, id: number) {
    const comment = await this.commentRepository.findById(id);
    await this.validateDeleteComment(comment, user);

    comment.delete();
    await this.commentRepository.save(comment);
  }

  async validateDeleteComment(comment: Comment, user: User) {
    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.userId !== user.id) {
      throw new NotAuthorException();
    }
  }
}
