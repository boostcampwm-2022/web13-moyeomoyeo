import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { GroupArticleRegisterResquest } from '@app/group-article/dto/group-article-register-request.dto';
import { GroupArticleRegisterResponse } from '@app/group-article/dto/group-article-register-response.dto';
import { GroupCategoryNotFoundException } from '@app/group-article/exception/group-category-not-found.exception';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupCategoryResponse } from '@app/group-article/dto/get-cateogories-response.dto';

@Controller('group-articles')
@ApiTags('Group-Article')
export class GroupArticleController {
  constructor(
    private readonly groupArticleService: GroupArticleService,
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

  @Post()
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.CREATED, GroupArticleRegisterResponse)
  @ApiErrorResponse(GroupCategoryNotFoundException)
  async registerBoard(
    @Body() groupArticleRegisterResquest: GroupArticleRegisterResquest,
  ) {
    const article = await this.groupArticleService.registerGroupArticle(
      groupArticleRegisterResquest,
    );
    const data = GroupArticleRegisterResponse.from(article);

    return ResponseEntity.CREATED_WITH_DATA(data);
  }
}
