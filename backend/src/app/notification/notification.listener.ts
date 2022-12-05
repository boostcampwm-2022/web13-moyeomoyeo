import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupSucceedEvent } from '@app/notification/event/group-succeed.event';
import { DataSource, IsNull } from 'typeorm';
import { Notification } from '@app/notification/entity/notification.entity';
import { User } from '@app/user/entity/user.entity';
import { NotificationSetting } from '@app/notification/entity/notification-setting.entity';
import {
  NOTIFICATION_SETTING_STATUS,
  NOTIFICATION_SETTING_TYPE,
} from '@app/notification/constants/notification.constants';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';

@Injectable()
export class NotificationListener {
  private readonly logger = new Logger(NotificationListener.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly groupApplicationRepository: GroupApplicationRepository,
  ) {}

  @OnEvent('group.succeed')
  async handleGroupSucceedEvent(event: GroupSucceedEvent) {
    const { groupArticle } = event;

    try {
      const groupApplications = await this.groupApplicationRepository.findBy({
        groupId: groupArticle.group.id,
        status: GROUP_APPLICATION_STATUS.REGISTER,
        deletedAt: IsNull(),
      });

      const targetUsers = await this.dataSource
        .createQueryBuilder()
        .select('user.*')
        .from(User, 'user')
        .leftJoin(
          NotificationSetting,
          'notificationSetting',
          'notificationSetting.userId = user.id',
        )
        .where('user.id IN (:...ids)', {
          ids: groupApplications.map(
            (groupApplication) => groupApplication.userId,
          ),
        })
        .andWhere('user.deletedAt IS NULL')
        .andWhere('notificationSetting.type = :type', {
          type: NOTIFICATION_SETTING_TYPE.GROUP,
        })
        .andWhere('notificationSetting.status = :status', {
          status: NOTIFICATION_SETTING_STATUS.ON,
        })
        .getRawMany<User>();

      const notification =
        Notification.createGroupSucceedNotification(groupArticle);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(
          targetUsers.map((user) =>
            UserNotification.create(user, notification),
          ),
        );
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
