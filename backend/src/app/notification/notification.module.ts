import { Module } from '@nestjs/common';
import { NotificationController } from '@app/notification/notification.controller';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';
import { NotificationService } from '@app/notification/notification.service';
import { NotificationListener } from '@app/notification/notification.listener';
import { GroupApplicationModule } from '@app/group-application/group-application.module';

@Module({
  imports: [GroupApplicationModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationSettingRepository,
    NotificationListener,
  ],
})
export class NotificationModule {}
