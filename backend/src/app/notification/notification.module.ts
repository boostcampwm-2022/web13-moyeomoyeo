import { Module } from '@nestjs/common';
import { NotificationController } from '@app/notification/notification.controller';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';

@Module({
  controllers: [NotificationController],
  providers: [NotificationSettingRepository],
})
export class NotificationModule {}
