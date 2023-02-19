import { GetUserNotificationResult } from '@app/notification/dto/get-user-notification-result.dto';
import { NoOffsetPageResult } from '@common/dto/no-offset-page-result';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class V2GetUserNotificationsResponse extends NoOffsetPageResult<GetUserNotificationResult> {
  @Expose()
  @ApiProperty({ type: GetUserNotificationResult, isArray: true })
  get data(): GetUserNotificationResult[] {
    return this._data;
  }
}
