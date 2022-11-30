import { ApiProperty } from '@nestjs/swagger';

export class CheckJoiningGroupResonse {
  @ApiProperty({
    example: true,
    description: '모임의 신청 여부를 조회',
    required: true,
  })
  isJoined: boolean;

  static from(isJoined: boolean) {
    const response = new CheckJoiningGroupResonse();
    response.isJoined = isJoined;
    return response;
  }
}
