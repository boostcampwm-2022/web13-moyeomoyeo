import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { ApiSuccessResponse } from '@decorator/api-success-resposne.decorator';
import { JwtAuth } from '@decorator/jwt-auth.decorator';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { ResponseEntity } from '@common/response-entity';
import { GetNotificationSettingsResponse } from '@app/notification/dto/get-notification-settings-response.dto';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(
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
}
