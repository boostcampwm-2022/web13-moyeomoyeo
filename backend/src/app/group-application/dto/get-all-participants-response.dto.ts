import { ApplicationWithUserInfo } from '@app/group-application/dto/application-with-user-info.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllParticipantsResponse {
  @ApiProperty({
    isArray: true,
    type: ApplicationWithUserInfo,
  })
  data: Array<ApplicationWithUserInfo>;
}
