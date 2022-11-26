import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  type: string;

  @Column({ type: 'json' })
  contents: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
