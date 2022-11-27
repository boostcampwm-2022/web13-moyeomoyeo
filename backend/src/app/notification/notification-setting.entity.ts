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
  type: string;

  @Column({ type: 'tinyint', precision: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
