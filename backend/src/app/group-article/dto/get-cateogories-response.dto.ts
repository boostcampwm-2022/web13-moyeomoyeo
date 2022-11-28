import { ApiProperty } from '@nestjs/swagger';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';

export class GroupCategoryResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '스터디' })
  name: string;

  static from(groupCategory: GroupCategory) {
    const dto = new GroupCategoryResponse();
    dto.id = groupCategory.id;
    dto.name = groupCategory.name;
    return dto;
  }
}
