import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
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
import { ApiErrorResponse } from '@decorator/api-error-response.decorator';
import { GroupArticleNotFoundException } from '@app/group-article/exception/group-article-not-found.exception';
import { NotAuthorException } from '@app/group-article/exception/not-author.exception';
import { MyGroupArticleService } from '@app/group-article/my-group-article.service';
import { GetMyGroupArticleResponse } from '@app/group-article/dto/get-my-group-article-response.dto';

@Controller('my-group-articles')
@ApiTags('MyGroupArticle')
export class MyGroupArticleController {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly myGroupArticleService: MyGroupArticleService,
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
        await Promise.all(
          result[0].map((row) => GroupArticleSearchResult.from(row)),
        ),
      ),
    );
  }

  @Get(':id')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, GetMyGroupArticleResponse)
  @ApiErrorResponse(GroupArticleNotFoundException, NotAuthorException)
  async getMyGroupArticle(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const groupArticle = await this.myGroupArticleService.getById(user, id);

    return ResponseEntity.OK_WITH_DATA(
      GetMyGroupArticleResponse.from(groupArticle),
    );
  }
}
