import { Injectable } from '@nestjs/common';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { User } from '@app/user/entity/user.entity';
import { NotificationSettingNotFoundException } from '@app/notification/exception/notification-setting-not-found.exception';
import { NOTIFICATION_SETTING_STATUS } from '@app/notification/constants/notification.constants';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationSettingRepository: NotificationSettingRepository,
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
}
