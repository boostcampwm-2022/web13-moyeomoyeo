import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  userName: string;

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

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  static signup({
    socialId,
    socialType,
    blogUrl,
    githubUrl,
    profileImage,
  }: {
    socialId: string;
    socialType: string;
    blogUrl: string;
    githubUrl: string;
    profileImage: string;
  }) {
    const user = new User();
    user.socialId = socialId;
    user.githubUrl = githubUrl;
    user.blogUrl = blogUrl;
    user.socialType = socialType;
    user.profileImage = profileImage;
    user.userName = randomUUID();
    return user;
  }
}
