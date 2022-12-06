import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@app/comment/entity/comment.entity';

export class CommentWritingResponse {
  @ApiProperty({
    example: 1,
    description: '댓글 아이디',
  })
  id: number;

  static from(comment: Comment) {
    const response = new CommentWritingResponse();
    response.id = comment.id;
  }
}
