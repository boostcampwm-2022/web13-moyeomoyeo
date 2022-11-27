import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class GroupApplication {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'tinyint' })
  status: number;

  @Column({ unsigned: true })
  userId: number;

  @Column({ unsigned: true })
  groupId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date;

  static register({ userId, groupId }: { userId: number; groupId: number }) {
    const groupApplication = new GroupApplication();
    groupApplication.userId = userId;
    groupApplication.groupId = groupId;
    groupApplication.status = GROUP_APPLICATION_STATUS.REGISTER;

    return groupApplication;
  }

  cancel() {
    this.status = GROUP_APPLICATION_STATUS.CANCEL;
    return this;
  }
}
