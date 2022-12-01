import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
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

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationSettingRepository: NotificationSettingRepository,
  ) {}

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
