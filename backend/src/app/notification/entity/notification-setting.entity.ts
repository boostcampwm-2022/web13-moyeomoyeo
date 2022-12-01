import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/entity/user.entity';
import {
  NOTIFICATION_SETTING_STATUS,
  NOTIFICATION_SETTING_TYPE,
} from '@app/notification/constants/notification.constants';

@Entity({ name: 'notification_setting' })
export class NotificationSetting {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  userId: number;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: Promise<User>;

  @Column({ type: 'varchar', length: 200 })
  type: NOTIFICATION_SETTING_TYPE;

  @Column({ type: 'varchar', length: 10 })
  status: NOTIFICATION_SETTING_STATUS;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static create(user: User, type: NOTIFICATION_SETTING_TYPE) {
    const notificationSetting = new NotificationSetting();
    notificationSetting.userId = user.id;
    notificationSetting.user = Promise.resolve(user);
    notificationSetting.type = type;
    notificationSetting.status = NOTIFICATION_SETTING_STATUS.ON;
    return notificationSetting;
  }
}
