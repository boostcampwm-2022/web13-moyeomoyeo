import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/entity/user.entity';

@Entity({ name: 'article' })
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export abstract class Article {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  userId: number;

  @ManyToOne(() => User, { lazy: true, nullable: false })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: Promise<User>;

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
}
