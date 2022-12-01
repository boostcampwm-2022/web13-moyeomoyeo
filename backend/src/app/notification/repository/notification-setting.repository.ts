import { DataSource, Repository } from 'typeorm';
import { NotificationSetting } from '@app/notification/entity/notification-setting.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationSettingRepository extends Repository<NotificationSetting> {
  constructor(private readonly dataSource: DataSource) {
    super(
      NotificationSetting,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
