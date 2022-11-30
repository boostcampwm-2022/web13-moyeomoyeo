import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';
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
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { GetGroupArticleDetailResponse } from '@app/group-article/dto/get-group-article-detail-response.dto';
import { GroupArticleNotFoundException } from '@app/group-article/exception/group-article-not-found.exception';
import { NotAuthorException } from '@app/group-article/exception/not-author.exception';
import { NotProgressGroupException } from '@app/group-article/exception/not-progress-group.exception';
import { IsNull } from 'typeorm';

@Controller('group-articles')
@ApiTags('Group-Article')
export class GroupArticleController {
  constructor(
    private readonly groupArticleService: GroupArticleService,
    private readonly groupCategoryRepository: GroupCategoryRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly imageService: ImageService,
  ) {}

  @Post('/')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.CREATED, GroupArticleRegisterResponse)
  @ApiErrorResponse(GroupCategoryNotFoundException)
  async createGroupArticle(
    @CurrentUser() user: User,
    @Body() groupArticleRegisterRequest: GroupArticleRegisterRequest,
  ) {
    const article = await this.groupArticleService.registerGroupArticle(
      user,
      groupArticleRegisterRequest,
    );

    return ResponseEntity.CREATED_WITH_DATA(
      GroupArticleRegisterResponse.from(article),
    );
  }

  @Post('/:id/recruitment-complete')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    NotAuthorException,
    GroupArticleNotFoundException,
    NotProgressGroupException,
  )
  async complete(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.groupArticleService.complete(user, id);
  }

  @Post('/:id/recruitment-cancel')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    NotAuthorException,
    GroupArticleNotFoundException,
    NotProgressGroupException,
  )
  async cancel(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.groupArticleService.cancel(user, id);
  }

  @Get('/categories')
  @ApiSuccessResponse(HttpStatus.OK, GroupCategoryResponse, { isArray: true })
  async getCategories() {
    const categories = await this.groupCategoryRepository.find({
      where: { deletedAt: IsNull() },
    });

    return ResponseEntity.OK_WITH_DATA(
      categories.map((category) => GroupCategoryResponse.from(category)),
    );
  }

  @Get('/search')
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

  @Get('/:id')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, GetGroupArticleDetailResponse)
  @ApiErrorResponse(GroupArticleNotFoundException)
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    const groupArticleDetail = await this.groupArticleService.getDetailById(id);

    return ResponseEntity.OK_WITH_DATA(
      GetGroupArticleDetailResponse.from(groupArticleDetail, this.imageService),
    );
  }

  @Delete('/:id')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(NotAuthorException, GroupArticleNotFoundException)
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.groupArticleService.remove(user, id);
  }
}
