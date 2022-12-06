import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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
import { CommentNotFoundException } from '@app/comment/exception/comment-not-found.exception';
import { NotAuthorException } from '@app/comment/exception/not-author.exception';

@Controller('comments')
@ApiTags('Comment')
@JwtAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  @ApiSuccessResponse(HttpStatus.CREATED, CommentWritingResponse)
  @ApiErrorResponse(GroupNotFoundException)
  async writeComment(
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

  @Delete(':id')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(CommentNotFoundException, NotAuthorException)
  async deleteComment(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.commentService.deleteComment(user, id);
  }
}
