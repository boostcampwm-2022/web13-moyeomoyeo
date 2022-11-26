import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';
import { Notification } from '@app/notification/notification.entity';

@Entity({ name: 'user_notification' })
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

  @Column({ type: 'timestamp' })
  deletedAt: Date | null;
}
