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
import { GroupArticle } from '@app/group-article/group-article.entity';
import { GroupCategory } from '@app/group-article/group-category.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  articleId: number;

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
}
