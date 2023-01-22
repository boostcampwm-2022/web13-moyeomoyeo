import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository, LessThan } from 'typeorm';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { User } from '@app/user/entity/user.entity';

@Injectable()
export class UserNotificationRepository extends Repository<UserNotification> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(UserNotification);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  getNotifications({
    user,
    limit,
    offset,
  }: {
    user: User;
    limit: number;
    offset: number;
  }) {
    return this.findAndCount({
      relations: {
        notification: true,
      },
      where: {
        userId: user.id,
        deletedAt: IsNull(),
      },
      order: {
        id: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  getNotificationsV2({
    user,
    limit,
    nextId,
  }: {
    user: User;
    limit: number;
    nextId?: number;
  }) {
    return this.find({
      relations: {
        notification: true,
      },
      where: {
        userId: user.id,
        deletedAt: IsNull(),
        ...(nextId ? { id: LessThan(nextId) } : {}),
      },
      take: limit,
      order: { id: 'DESC' },
    });
  }
}
