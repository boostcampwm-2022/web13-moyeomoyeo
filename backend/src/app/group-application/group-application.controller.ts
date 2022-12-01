import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GroupApplicationService } from '@app/group-application/group-application.service';
import { GroupApplicationRequest } from '@src/app/group-application/dto/group-application-request.dto';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { AttendGroupResponse } from '@app/group-application/dto/attend-group-response.dto';
import { CurrentUser } from '@src/common/decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from '@src/app/group-application/exception/cannot-applicate.exception';
import { CheckJoiningGroupResonse } from '@app/group-application/dto/check-joining-group-response.dto';
import { ApplicationNotFoundException } from '@app/group-application/exception/application-not-found.exception';
import { ApplicationWithUserInfoResponse } from '@app/group-application/dto/application-with-user-info-response.dto';

@Controller('group-applications')
@JwtAuth()
@ApiTags('Group-Application')
export class GroupApplicationController {
  constructor(
    private readonly groupApplicationService: GroupApplicationService,
  ) {}

  @Post('/')
  @ApiSuccessResponse(HttpStatus.CREATED, AttendGroupResponse)
  @ApiErrorResponse(
    DuplicateApplicationException,
    CannotApplicateException,
    GroupNotFoundException,
  )
  async joinGroup(
    @CurrentUser() user: User,
    @Body() groupApplicationRequest: GroupApplicationRequest,
  ) {
    const groupArticleId = groupApplicationRequest.groupArticleId;
    const groupApplication = await this.groupApplicationService.joinGroup(
      user,
      groupArticleId,
    );
    const data = AttendGroupResponse.from(groupApplication.id);
    return ResponseEntity.CREATED_WITH_DATA(data);
  }

  @Get('/status')
  @ApiSuccessResponse(HttpStatus.OK, CheckJoiningGroupResonse)
  @ApiErrorResponse(GroupNotFoundException)
  async checkJoinedGroup(
    @CurrentUser() user: User,
    @Query('groupArticleId', ParseIntPipe) groupArticleId: number,
  ) {
    const isJoined = await this.groupApplicationService.checkJoinedGroup(
      user,
      groupArticleId,
    );
    const data = CheckJoiningGroupResonse.from(isJoined);
    return ResponseEntity.OK_WITH_DATA(data);
  }

  @Get('participants')
  @ApiSuccessResponse(HttpStatus.OK, ApplicationWithUserInfoResponse, {
    isArray: true,
  })
  @ApiErrorResponse(GroupNotFoundException)
  async getAllParticipants(
    @CurrentUser() user: User,
    @Query('groupArticleId', ParseIntPipe) groupArticleId: number,
  ) {
    const data = await this.groupApplicationService.getAllParticipants(
      user,
      groupArticleId,
    );
    return ResponseEntity.OK_WITH_DATA(data);
  }

  @Post('cancel')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    CannotApplicateException,
    GroupNotFoundException,
    ApplicationNotFoundException,
  )
  async cancelJoinedGroup(
    @CurrentUser() user: User,
    @Body() groupApplicationRequest: GroupApplicationRequest,
  ) {
    const groupArticleId = groupApplicationRequest.groupArticleId;
    await this.groupApplicationService.cancelJoinedGroup(user, groupArticleId);
  }
}
