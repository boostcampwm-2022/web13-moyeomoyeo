import { Module } from '@nestjs/common';
import { CommentController } from '@app/comment/comment.controller';
import { CommentService } from '@app/comment/comment.service';
import { CommentRepository } from '@app/comment/comment.repository';
import { GroupArticleModule } from '@app/group-article/group-article.module';

@Module({
  imports: [GroupArticleModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
