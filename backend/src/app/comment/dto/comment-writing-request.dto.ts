import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CommentWritingRequest {
  @ApiProperty({
    example: 1,
    description: '모집 게시판 아이디',
  })
  @IsNumber()
  articleId: number;

  @ApiProperty({
    example: '정확히 어떤 걸 공부하는 걸까요?',
    description: '댓글 내용',
  })
  @IsString()
  contents: string;
}
