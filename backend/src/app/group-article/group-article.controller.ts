import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { ResponseEntity } from '@common/response-entity';
import { GroupCategoryResponse } from '@app/group-article/dto/get-cateogories-response.dto';
import { ApiSuccessResponse } from '@decorator/api-success-resposne.decorator';

@Controller('group-articles')
@ApiTags('GroupArticle')
export class GroupArticleController {
  constructor(
    private readonly groupCategoryRepository: GroupCategoryRepository,
  ) {}

  @Get('/categories')
  @ApiSuccessResponse(HttpStatus.OK, GroupCategoryResponse, { isArray: true })
  async getCategories() {
    const categories = await this.groupCategoryRepository.find({
      where: { deletedAt: null },
    });

    return ResponseEntity.OK_WITH_DATA(
      categories.map((category) => GroupCategoryResponse.from(category)),
    );
  }
}
