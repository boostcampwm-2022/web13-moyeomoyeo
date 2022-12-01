import { NotFoundException } from '@nestjs/common';

export class NotificationSettingNotFoundException extends NotFoundException {
  constructor(message = '알림설정 데이터가 존재하지 않습니다') {
    super({ status: 'NOTIFICATION_SETTING_NOT_FOUND', message });
  }
}
