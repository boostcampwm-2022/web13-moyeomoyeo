import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PageResult } from '@common/util/page-result';
import { GetUserNotificationResult } from '@app/notification/dto/get-user-notification-result.dto';

export class GetUserNotificationsResponse extends PageResult<GetUserNotificationResult> {
  @Expose()
  @ApiProperty({ type: GetUserNotificationResult, isArray: true })
  get data() {
    return this._data;
  }
}
