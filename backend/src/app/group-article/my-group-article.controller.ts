import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { JwtAuth } from '@decorator/jwt-auth.decorator';
import { ApiSuccessResponse } from '@decorator/api-success-resposne.decorator';
import { SearchGroupArticleResponse } from '@app/group-article/dto/search-group-articles-response.dto';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { PageRequest } from '@common/util/page-request';
import { ResponseEntity } from '@common/response-entity';
import { GroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.dto';

@Controller('my-group-articles')
@ApiTags('MyGroupArticle')
export class MyGroupArticleController {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
  ) {}

  @Get('/')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, SearchGroupArticleResponse)
  async getMyGroupArticles(
    @CurrentUser() user: User,
    @Query() query: PageRequest,
  ) {
    const result = await this.groupArticleRepository.search({
      limit: query.getLimit(),
      offset: query.getOffset(),
      user,
    });

    return ResponseEntity.OK_WITH_DATA(
      new SearchGroupArticleResponse(
        result[1],
        query.currentPage,
        query.countPerPage,
        result[0].map((row) => GroupArticleSearchResult.from(row)),
      ),
    );
  }
}
