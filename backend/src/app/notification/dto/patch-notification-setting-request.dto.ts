import { NOTIFICATION_SETTING_STATUS } from '@app/notification/constants/notification.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class PatchNotificationSettingRequest {
  @ApiProperty({
    enum: NOTIFICATION_SETTING_STATUS,
    example: NOTIFICATION_SETTING_STATUS.ON,
    description: '알림상태(ON|OFF)',
    required: true,
  })
  @IsEnum(NOTIFICATION_SETTING_STATUS)
  status: NOTIFICATION_SETTING_STATUS;
}
