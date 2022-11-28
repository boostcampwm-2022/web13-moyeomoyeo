import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { ARTICLE } from './constants/group-article.constants';
import { GroupArticleRegisterResquest } from './dto/group-article-register-request.dto';
import { GroupArticleRegisterResponse } from './dto/group-article-register-response.dto';
import { GroupCategoryNotFound } from './exception/group-category-not-found';

import { GroupArticleService } from './group-article.service';

@Controller('group-articles')
@ApiTags('Group-Article')
export class GroupArticleController {
  constructor(private readonly groupArticleService: GroupArticleService) {}

  @Post()
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.CREATED, GroupArticleRegisterResponse)
  @ApiErrorResponse(GroupCategoryNotFound)
  async registerBoard(
    @Body() groupArticleRegisterResquest: GroupArticleRegisterResquest,
  ) {
    const article = await this.groupArticleService.registerGroupArticle(
      groupArticleRegisterResquest,
      ARTICLE.GROUP,
    );
    const data = new GroupArticleRegisterResponse(article.id);

    return ResponseEntity.CREATED_WITH_DATA(data);
  }
}
