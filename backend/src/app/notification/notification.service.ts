import { Injectable } from '@nestjs/common';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { User } from '@app/user/entity/user.entity';
import { NotificationSettingNotFoundException } from '@app/notification/exception/notification-setting-not-found.exception';
import { NOTIFICATION_SETTING_STATUS } from '@app/notification/constants/notification.constants';
import { UserNotificationRepository } from '@app/notification/repository/user-notification.repository';
import { IsNull } from 'typeorm';
import { UserNotificationNotFoundException } from '@app/notification/exception/user-notification-not-found.exception';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationSettingRepository: NotificationSettingRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async updateStatus(
    user: User,
    id: number,
    status: NOTIFICATION_SETTING_STATUS,
  ) {
    const notificationSetting =
      await this.notificationSettingRepository.findOneBy({
        id,
      });

    if (!notificationSetting) {
      throw new NotificationSettingNotFoundException();
    }

    notificationSetting.setStatus(user, status);

    await this.notificationSettingRepository.save(notificationSetting);
  }

  async remove(user: User, id: number) {
    const userNotification = await this.userNotificationRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (!userNotification) {
      throw new UserNotificationNotFoundException();
    }

    userNotification.remove(user);

    await this.userNotificationRepository.save(userNotification);
  }
}
