import { DataSource, IsNull, Repository } from 'typeorm';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { Injectable } from '@nestjs/common';
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
}
