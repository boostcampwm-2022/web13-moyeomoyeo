import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 400, default: '' })
  profileImage: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  description: string;

  @Column({ type: 'varchar', length: 400, default: '' })
  githubUrl: string;

  @Column({ type: 'varchar', length: 400, default: '' })
  blogUrl: string;

  @Column({ type: 'varchar', length: 100 })
  socialId: string;

  @Column({ type: 'varchar', length: 10 })
  socialType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp' })
  deletedAt: Date;
}
