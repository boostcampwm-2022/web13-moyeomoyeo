import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupSucceedEvent } from '@app/notification/event/group-succeed.event';
import { DataSource } from 'typeorm';
import { Notification } from '@app/notification/entity/notification.entity';
import { NOTIFICATION_SETTING_TYPE } from '@app/notification/constants/notification.constants';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupFailedEvent } from '@app/notification/event/group-failed.event';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { CommentAddedEvent } from '@app/notification/event/comment-added.event';
import { CommentRepository } from '@app/comment/comment.repository';
import { SseService } from '@common/module/sse/sse.service';
import { NotificationSse } from '@app/notification/dto/notification-sse.dto';

@Injectable()
export class NotificationListener {
  private readonly logger = new Logger(NotificationListener.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly notificationSettingRepository: NotificationSettingRepository,
    private readonly commentRepository: CommentRepository,
    private readonly sseService: SseService,
  ) {}

  @OnEvent(GroupSucceedEvent.event, { async: true })
  async handleGroupSucceedEvent(event: GroupSucceedEvent) {
    const { groupArticle } = event;

    try {
      const groupApplications =
        await this.groupApplicationRepository.findGroupApplications(
          groupArticle,
        );

      const targetUsers =
        await this.notificationSettingRepository.findTargetUsers({
          type: NOTIFICATION_SETTING_TYPE.GROUP,
          userIds: groupApplications.map(
            (groupApplication) => groupApplication.userId,
          ),
        });

      if (targetUsers.length === 0) {
        return;
      }

      const notification =
        Notification.createGroupSucceedNotification(groupArticle);

      const userNotifications =
        notification.createUserNotifications(targetUsers);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(userNotifications);
      });

      await Promise.all(
        userNotifications.map(async (userNotification) =>
          this.sseService.emit(
            await userNotification.user,
            await NotificationSse.from(userNotification),
          ),
        ),
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  @OnEvent(GroupFailedEvent.event, { async: true })
  async handleGroupFailedEvent(event: GroupFailedEvent) {
    const { groupArticle } = event;

    try {
      const groupApplications =
        await this.groupApplicationRepository.findGroupApplications(
          groupArticle,
        );

      const targetUsers =
        await this.notificationSettingRepository.findTargetUsers({
          type: NOTIFICATION_SETTING_TYPE.GROUP,
          userIds: groupApplications.map(
            (groupApplication) => groupApplication.userId,
          ),
        });

      if (targetUsers.length === 0) {
        return;
      }

      const notification =
        Notification.createGroupFailedNotification(groupArticle);

      const userNotifications =
        notification.createUserNotifications(targetUsers);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(userNotifications);
      });

      await Promise.all(
        userNotifications.map(async (userNotification) =>
          this.sseService.emit(
            await userNotification.user,
            await NotificationSse.from(userNotification),
          ),
        ),
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  @OnEvent(CommentAddedEvent.event, { async: true })
  async handleCommentAddedEvent(event: CommentAddedEvent) {
    const { groupArticle, comment } = event;
    try {
      const commentList = await this.commentRepository.findByArticleId(
        comment.userId,
        groupArticle.id,
      );

      const targetUsers =
        await this.notificationSettingRepository.findTargetUsers({
          type: NOTIFICATION_SETTING_TYPE.COMMENT,
          userIds: commentList
            .map((comment) => comment.userId)
            .concat(groupArticle.userId),
        });

      if (targetUsers.length === 0) {
        return;
      }

      const notification = await Notification.createCommentAddedNotification(
        groupArticle,
        comment,
      );

      const userNotifications =
        notification.createUserNotifications(targetUsers);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(userNotifications);
      });

      await Promise.all(
        userNotifications.map(async (userNotification) =>
          this.sseService.emit(
            await userNotification.user,
            await NotificationSse.from(userNotification),
          ),
        ),
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
