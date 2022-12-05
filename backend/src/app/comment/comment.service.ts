import { Injectable } from '@nestjs/common';
import { CommnetRepository } from '@app/comment/comment.repository';
import { CommentWritingRequest } from '@app/comment/dto/comment-writing-request.dto';
import { User } from '@app/user/entity/user.entity';
import { Comment } from '@app/comment/entity/comment.entity';
import { cp } from 'fs';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { GroupNotFoundException } from '@app/comment/exception/group-not-found.exception';

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
}
