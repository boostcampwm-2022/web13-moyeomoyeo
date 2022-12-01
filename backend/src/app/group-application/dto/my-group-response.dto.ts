import { GroupArticleResponse } from '@app/group-application/dto/group-article-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MyGroupResponse {
  @ApiProperty({
    example: 1,
    description: '그룹 아이디',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: '2022년 12월 1일',
    description: '모임에 등록된 시간',
    required: true,
  })
  appliedAt: string;

  @ApiProperty()
  groupArticle: GroupArticleResponse;
}
