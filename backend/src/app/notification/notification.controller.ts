import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { ApiSuccessResponse } from '@decorator/api-success-resposne.decorator';
import { JwtAuth } from '@decorator/jwt-auth.decorator';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { ResponseEntity } from '@common/response-entity';
import { GetNotificationSettingsResponse } from '@app/notification/dto/get-notification-settings-response.dto';
import { NotificationService } from '@app/notification/notification.service';
import { PatchNotificationSettingRequest } from '@app/notification/dto/patch-notification-setting-request.dto';
import { ApiErrorResponse } from '@decorator/api-error-response.decorator';
import { NotificationSettingNotFoundException } from '@app/notification/exception/notification-setting-not-found.exception';
import { NotAccessibleException } from '@app/notification/exception/not-accessible.exception';
import { PageRequest } from '@common/util/page-request';
import { UserNotificationRepository } from '@app/notification/repository/user-notification.repository';
import { GetUserNotificationsResponse } from '@app/notification/dto/get-user-notifications-response.dto';
import { GetUserNotificationResult } from '@app/notification/dto/get-user-notification-result.dto';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationSettingRepository: NotificationSettingRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  @Get('/')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, GetUserNotificationsResponse)
  async getNotifications(
    @CurrentUser() user: User,
    @Query() query: PageRequest,
  ) {
    const [userNotifications, count] =
      await this.userNotificationRepository.getNotifications({
        user,
        limit: query.getLimit(),
        offset: query.getOffset(),
      });

    return ResponseEntity.OK_WITH_DATA(
      new GetUserNotificationsResponse(
        count,
        query.currentPage,
        query.countPerPage,
        await Promise.all(
          userNotifications.map((userNotification) =>
            GetUserNotificationResult.from(userNotification),
          ),
        ),
      ),
    );
  }

  @Get('settings')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, GetNotificationSettingsResponse, {
    isArray: true,
  })
  async settings(@CurrentUser() user: User) {
    const notificationSettings =
      await this.notificationSettingRepository.findBy({
        userId: user.id,
      });

    return ResponseEntity.OK_WITH_DATA(
      notificationSettings.map((notificationSetting) =>
        GetNotificationSettingsResponse.from(notificationSetting),
      ),
    );
  }

  @Patch('settings/:id/status')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    NotificationSettingNotFoundException,
    NotAccessibleException,
  )
  async updateSettings(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { status }: PatchNotificationSettingRequest,
  ) {
    await this.notificationService.updateStatus(user, id, status);
  }
}
