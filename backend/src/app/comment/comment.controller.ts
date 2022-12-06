import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CommentService } from '@app/comment/comment.service';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { CommentWritingResponse } from '@app/comment/dto/comment-writing-response.dto';
import { CurrentUser } from '@src/common/decorator/current-user.decorator';
import { CommentWritingRequest } from '@app/comment/dto/comment-writing-request.dto';
import { User } from '@app/user/entity/user.entity';
import { ResponseEntity } from '@src/common/response-entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { GroupNotFoundException } from '@app/comment/exception/group-not-found.exception';
import { GroupArticleCommentGetResponse } from '@src/app/comment/dto/group-article-comment-get-response.dto';
import { GetAllCommentQueryRequest } from '@app/comment/dto/get-all-comment-query-request.dto';
import { CommentRepository } from '@app/comment/comment.repository';

@Controller('comments')
@ApiTags('Comment')
@JwtAuth()
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentRepository: CommentRepository,
  ) {}

  @Post('/')
  @ApiSuccessResponse(HttpStatus.CREATED, CommentWritingResponse)
  @ApiErrorResponse(GroupNotFoundException)
  async writeCommnet(
    @CurrentUser() user: User,
    @Body() commentWritingRequest: CommentWritingRequest,
  ) {
    const comment = await this.commentService.writeComment(
      user,
      commentWritingRequest,
    );
    const data = CommentWritingResponse.from(comment);
    return ResponseEntity.CREATED_WITH_DATA(data);
  }

  @Get('/')
  @ApiSuccessResponse(HttpStatus.OK, GroupArticleCommentGetResponse, {
    isArray: true,
  })
  @ApiErrorResponse(GroupNotFoundException)
  async getComment(@Query() query: GetAllCommentQueryRequest) {
    const { count, commentResponse } = await this.commentService.getComment({
      limit: query.getLimit(),
      offset: query.getOffset(),
      articleId: query.articleId,
    });

    const data = new GroupArticleCommentGetResponse(
      count,
      query.currentPage,
      query.countPerPage,
      commentResponse,
    );
    return ResponseEntity.OK_WITH_DATA(data);
  }
}
