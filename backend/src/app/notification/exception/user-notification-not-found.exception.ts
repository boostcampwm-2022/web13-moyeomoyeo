import { NotFoundException } from '@nestjs/common';

export class UserNotificationNotFoundException extends NotFoundException {
  constructor(message = '해당하는 알림 내역이 존재하지 않습니다') {
    super({ status: 'USER_NOTIFICATION_NOT_FOUND', message });
  }
}
