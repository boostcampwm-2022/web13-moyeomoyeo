import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';
import { Article } from '@app/group-article/article.entity';

@Entity()
@Unique('UNIQUE_USER_ID_ARTICLE_ID', ['userId', 'articleId'])
export class Scrap {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  userId: number;

  @ManyToOne(() => User, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: Promise<User>;

  @Column({ unsigned: true })
  articleId: number;

  @ManyToOne(() => Article, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'article_id' })
  article: Promise<Article>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
