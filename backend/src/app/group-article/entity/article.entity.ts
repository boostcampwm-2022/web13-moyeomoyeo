import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'article' })
export class Article {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 65535 })
  contents: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  type: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  thumbnail: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date;

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
