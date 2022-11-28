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
import { GROUP_STATUS } from '@app/group-article/constants/group-article.constants';
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

  @Column()
  location: string;

  @Column()
  maxCapacity: number;

  @Column()
  status: string;

  @Column()
  chatUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static register({
    location,
    chatUrl,
    maxCapacity,
    category,
  }: {
    location: string;
    chatUrl: string;
    maxCapacity: number;
    category: GroupCategory;
  }) {
    const group = new Group();
    group.location = location;
    group.status = GROUP_STATUS.STILL;
    group.chatUrl = chatUrl;
    group.maxCapacity = maxCapacity;
    group.category = category;

    return group;
  }

  success() {
    this.updatedAt = new Date();
    this.status = GROUP_STATUS.SUCCESS;
  }

  cancel() {
    this.status = GROUP_STATUS.CANCEL;
  }
}
