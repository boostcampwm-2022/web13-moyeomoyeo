import { Module } from '@nestjs/common';
import { NotificationController } from '@app/notification/notification.controller';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { NotificationService } from '@app/notification/notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationSettingRepository],
})
export class NotificationModule {}
