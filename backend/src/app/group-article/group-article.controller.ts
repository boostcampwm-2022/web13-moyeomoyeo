import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
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
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { SearchGroupArticlesRequest } from '@app/group-article/dto/search-group-articles-request.dto';
import { SearchGroupArticleResponse } from '@app/group-article/dto/search-group-articles-response.dto';
import { GroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.dto';
import { ImageService } from '@app/image/image.service';

@Controller('group-articles')
@ApiTags('Group-Article')
export class GroupArticleController {
  constructor(
    private readonly groupArticleService: GroupArticleService,
    private readonly groupCategoryRepository: GroupCategoryRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly imageService: ImageService,
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

  @Get('/search')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, SearchGroupArticleResponse)
  async search(@Query() query: SearchGroupArticlesRequest) {
    const result = await this.groupArticleRepository.search(query);

    return ResponseEntity.OK_WITH_DATA(
      new SearchGroupArticleResponse(
        result[1],
        query.currentPage,
        query.countPerPage,
        result[0].map((row) =>
          GroupArticleSearchResult.from(row, this.imageService),
        ),
      ),
    );
  }
}
