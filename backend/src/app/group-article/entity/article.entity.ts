import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'article' })
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export class Article {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 300 })
  thumbnail: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  static register({
    title,
    contents,
    type,
    thumbnail,
  }: {
    title: string;
    contents: string;
    type: string;
    thumbnail: string;
  }) {
    const article = new Article();
    article.title = title;
    article.contents = contents;
    article.type = type;
    article.thumbnail = thumbnail;
    return article;
  }

  delete() {
    this.deletedAt = new Date();
  }
}
