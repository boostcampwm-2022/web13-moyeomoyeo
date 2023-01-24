import { Injectable } from '@nestjs/common';
import { CommentRepository } from '@app/comment/comment.repository';
import { CommentWritingRequest } from '@app/comment/dto/comment-writing-request.dto';
import { User } from '@app/user/entity/user.entity';
import { Comment } from '@app/comment/entity/comment.entity';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { GroupNotFoundException } from '@app/comment/exception/group-not-found.exception';
import { CommentResponse } from '@app/comment/dto/comment-response.dto';
import { CommentNotFoundException } from '@app/comment/exception/comment-not-found.exception';
import { NotAuthorException } from '@app/comment/exception/not-author.exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { CommentAddedEvent } from '@app/notification/event/comment-added.event';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async writeComment(user: User, commentWritingRequest: CommentWritingRequest) {
    const groupArticle = await this.groupArticleRepository.findById(
      commentWritingRequest.articleId,
    );
    this.validateArticle(groupArticle);

    const comment = Comment.from(
      user,
      commentWritingRequest.articleId,
      commentWritingRequest.contents,
    );

    const result = await this.commentRepository.save(comment);
    await this.eventEmitter.emitAsync(
      CommentAddedEvent.event,
      new CommentAddedEvent(groupArticle, result),
    );
    return result;
  }

  validateArticle(groupArticle: GroupArticle) {
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
  }

  async getComment({
    limit,
    offset,
    articleId,
  }: {
    limit: number;
    offset: number;
    articleId: number;
  }) {
    const groupArticle = await this.groupArticleRepository.findById(articleId);
    this.validateArticle(groupArticle);
    const { allCommentList, totalCount } =
      await this.commentRepository.selectAllComments({
        articleId,
        limit,
        offset,
      });
    const commentResponse = await this.bindCommentResponse(allCommentList);
    return { totalCount, commentResponse };
  }

  bindCommentResponse(allCommentList: Comment[]) {
    const commentWithUserList = allCommentList.map(async (comment) => {
      const user = await comment.user;
      return CommentResponse.from(comment, user);
    });

    return Promise.all(commentWithUserList);
  }

  async deleteComment(user: User, id: number) {
    const comment = await this.commentRepository.findById(id);
    this.validateDeleteComment(comment, user);

    comment.delete();
    await this.commentRepository.save(comment);
  }

  validateDeleteComment(comment: Comment, user: User) {
    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.userId !== user.id) {
      throw new NotAuthorException();
    }
  }
}
