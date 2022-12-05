import { Module } from '@nestjs/common';
import { CommentController } from '@app/comment/comment.controller';
import { CommentService } from '@app/comment/comment.service';
import { CommnetRepository } from '@app/comment/comment.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommnetRepository],
})
export class CommentModule {}
