import { MessageEvent } from '@nestjs/common';
import { GetUserNotificationResult } from '@app/notification/dto/get-user-notification-result.dto';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { randomUUID } from 'crypto';

export class NotificationSse implements MessageEvent {
  id: string;
  data: GetUserNotificationResult;
  type: string;

  retry: number;

  static async from(userNotification: UserNotification) {
    const notificationSse = new NotificationSse();
    notificationSse.id = randomUUID();
    notificationSse.data = await GetUserNotificationResult.from(
      userNotification,
    );
    notificationSse.type = 'NOTIFICATION';
    notificationSse.retry = 3 * 1000;
    return notificationSse;
  }
}
