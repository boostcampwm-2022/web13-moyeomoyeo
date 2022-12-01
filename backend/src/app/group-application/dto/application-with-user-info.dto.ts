import { ApiProperty } from '@nestjs/swagger';
import { UserInfo } from '@app/group-application/dto/user-info.dto';

export class ApplicationWithUserInfo {
  @ApiProperty({
    example: 1,
    description: '',
    required: true,
  })
  id: number;

  @ApiProperty()
  user: UserInfo;
}
