import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {}
