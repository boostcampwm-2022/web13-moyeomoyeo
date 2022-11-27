import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  location: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'varchar', length: 200 })
  chatRoomId: string;

  @Column({ unsigned: true })
  maxCapacity: number;

  @Column({ unsigned: true })
  articleId: number;

  @Column({ unsigned: true })
  categoryId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date;

  static register({
    location,
    status,
    chatRoomUrl,
    maxCapacity,
    articleId,
    categoryId,
  }: {
    location: string;
    status: string;
    chatRoomUrl: string;
    maxCapacity: number;
    articleId: number;
    categoryId: number;
  }) {
    const group = new Group();
    group.location = location;
    group.status = status;
    group.chatRoomId = chatRoomUrl;
    group.maxCapacity = maxCapacity;
    group.articleId = articleId;
    group.categoryId = categoryId;

    return group;
  }

  success() {
    this.updatedAt = new Date();
    this.status = GROUP_STATUS.SUCCESS;
  }

  end() {
    this.updatedAt = new Date();
    this.status = GROUP_STATUS.END;
  }

  cancel() {
    this.deletedAt = new Date();
    this.status = GROUP_STATUS.CANCEL;
  }
}
