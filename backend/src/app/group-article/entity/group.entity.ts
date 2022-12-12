import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';

@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @OneToOne(() => GroupArticle, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'article_id' })
  article: Promise<GroupArticle>;

  @ManyToOne(() => GroupCategory, { eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'category_id' })
  category: GroupCategory;

  @Column({ type: 'varchar', length: 30 })
  location: LOCATION;

  @Column()
  maxCapacity: number;

  @Column({ type: 'varchar', length: 30 })
  status: GROUP_STATUS;

  @Column()
  chatUrl: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnail: string;

  @Column({ type: 'varchar', length: 2000, default: '' })
  blurThumbnail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create({
    location,
    chatUrl,
    maxCapacity,
    category,
    thumbnail,
  }: {
    location: LOCATION;
    chatUrl: string;
    maxCapacity: number;
    category: GroupCategory;
    thumbnail: string;
  }) {
    const group = new Group();
    group.location = location;
    group.status = GROUP_STATUS.PROGRESS;
    group.chatUrl = chatUrl;
    group.maxCapacity = maxCapacity;
    group.category = category;
    group.thumbnail = thumbnail;

    return group;
  }

  cancel() {
    this.status = GROUP_STATUS.FAIL;
  }

  complete() {
    this.status = GROUP_STATUS.SUCCEED;
  }
}
