import { ApiProperty } from '@nestjs/swagger';
import { UserInfo } from '@app/group-application/dto/user-info.dto';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';

export class ApplicationWithUserInfoResponse {
  @ApiProperty({
    example: 1,
    description: '',
    required: true,
  })
  id: number;

  @ApiProperty()
  user: UserInfo;

  static from(userInfo: UserInfo, application: GroupApplication) {
    const response = new ApplicationWithUserInfoResponse();
    response.id = application.id;
    response.user = userInfo;
    return response;
  }
}
