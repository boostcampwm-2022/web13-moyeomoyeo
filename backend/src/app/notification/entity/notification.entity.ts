import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NOTIFICATION_TYPE } from '@app/notification/constants/notification.constants';
import {
  GroupFailedContents,
  GroupSucceedContents,
} from '@app/notification/entity/notification-contents';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  type: NOTIFICATION_TYPE;

  @Column({ type: 'json' })
  contents: GroupSucceedContents | GroupFailedContents;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  static createGroupSucceedNotification(groupArticle: GroupArticle) {
    const notification = new Notification();
    notification.type = NOTIFICATION_TYPE.GROUP_SUCCEED;
    notification.contents = {
      title: '모임이 성사되었어요',
      subTitle: groupArticle.title,
      groupArticleId: groupArticle.id,
    };
    return notification;
  }

  static createGroupFailedNotification(groupArticle: GroupArticle) {
    const notification = new Notification();
    notification.type = NOTIFICATION_TYPE.GROUP_FAILED;
    notification.contents = {
      title: '모임이 무산되었어요',
      subTitle: groupArticle.title,
      groupArticleId: groupArticle.id,
    };
    return notification;
  }
}
