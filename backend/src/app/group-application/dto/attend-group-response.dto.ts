import { ApiProperty } from '@nestjs/swagger';

export class AttendGroupResponse {
  @ApiProperty({
    example: 1,
    description: '참가신청 아이디',
    required: true,
  })
  id: number;

  static from(id: number) {
    const response = new AttendGroupResponse();
    response.id = id;
    return response;
  }
}
