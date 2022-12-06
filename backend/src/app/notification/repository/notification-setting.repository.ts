import { DataSource, Repository } from 'typeorm';
import { NotificationSetting } from '@app/notification/entity/notification-setting.entity';
import { Injectable } from '@nestjs/common';
import {
  NOTIFICATION_SETTING_STATUS,
  NOTIFICATION_SETTING_TYPE,
} from '@app/notification/constants/notification.constants';
import { User } from '@app/user/entity/user.entity';

@Injectable()
export class NotificationSettingRepository extends Repository<NotificationSetting> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(NotificationSetting);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  findTargetUsers({
    type,
    userIds,
  }: {
    type: NOTIFICATION_SETTING_TYPE;
    userIds: number[];
  }) {
    return this.createQueryBuilder('notificationSetting')
      .select('user.*')
      .leftJoin(User, 'user', 'user.id = notificationSetting.userId')
      .where('user.id IN (:...ids)', {
        ids: userIds,
      })
      .andWhere('user.deletedAt IS NULL')
      .andWhere('notificationSetting.type = :type', {
        type,
      })
      .andWhere('notificationSetting.status = :status', {
        status: NOTIFICATION_SETTING_STATUS.ON,
      })
      .getRawMany<User>();
  }
}
