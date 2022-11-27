import { ApiProperty } from '@nestjs/swagger';

export class GroupArticleRegisterResponse {
  @ApiProperty({
    example: 1,
    description: '모집게시글 ID',
    required: true,
  })
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
