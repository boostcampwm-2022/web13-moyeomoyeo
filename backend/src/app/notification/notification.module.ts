import { Module } from '@nestjs/common';
import { NotificationController } from '@app/notification/notification.controller';

@Module({
  controllers: [NotificationController],
})
export class NotificationModule {}
