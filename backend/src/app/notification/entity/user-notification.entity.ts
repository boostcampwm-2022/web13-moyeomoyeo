import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/entity/user.entity';
import { Notification } from '@app/notification/entity/notification.entity';
import { NotAccessibleException } from '@app/notification/exception/not-accessible.exception';

@Entity({ name: 'user_notification' })
@Index('UNIQUE_user_id_notification_id', ['userId', 'notificationId'], {
  unique: true,
})
export class UserNotification {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  notificationId: number;

  @Column({ unsigned: true })
  userId: number;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: Promise<User>;

  @ManyToOne(() => Notification, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'notification_id' })
  notification: Promise<Notification>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  static create(user: User, notification: Notification) {
    const userNotification = new UserNotification();
    userNotification.userId = user.id;
    userNotification.user = Promise.resolve(user);
    userNotification.notification = Promise.resolve(notification);
    userNotification.notificationId = notification.id;
    return userNotification;
  }

  remove(user: User) {
    if (user.id !== this.userId) {
      throw new NotAccessibleException();
    }

    this.deletedAt = new Date();
  }
}
