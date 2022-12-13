import {
  NOTIFICATION_SETTING_STATUS,
  NOTIFICATION_SETTING_TYPE,
} from '@app/notification/constants/notification.constants';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationSetting } from '@app/notification/entity/notification-setting.entity';

export class GetNotificationSettingsResponse {
  @ApiProperty({ example: 1, description: '알림설정아이디' })
  id: number;

  @ApiProperty({
    example: NOTIFICATION_SETTING_TYPE.GROUP,
    description: '알림설정타입',
  })
  type: NOTIFICATION_SETTING_TYPE;

  @ApiProperty({
    example: NOTIFICATION_SETTING_STATUS.ON,
    description: '알림설정상태',
  })
  status: NOTIFICATION_SETTING_STATUS;

  static from(notificationSetting: NotificationSetting) {
    const res = new GetNotificationSettingsResponse();
    res.id = notificationSetting.id;
    res.type = notificationSetting.type;
    res.status = notificationSetting.status;
    return res;
  }
}
