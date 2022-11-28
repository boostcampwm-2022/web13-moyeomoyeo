import { ApiProperty } from '@nestjs/swagger';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GroupArticleRegisterResponse {
  @ApiProperty({
    example: 1,
    description: '모집게시글 ID',
    required: true,
  })
  id: number;

  static from(groupArticle: GroupArticle) {
    const response = new GroupArticleRegisterResponse();
    response.id = groupArticle.id;
    return response;
  }
}
