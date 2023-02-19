import { ApiProperty } from '@nestjs/swagger';
import { PageRequest } from '@common/dto/page-request';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetAllCommentQueryRequest extends PageRequest {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '모집 게시글 아이디',
    required: false,
  })
  articleId: number;
}
