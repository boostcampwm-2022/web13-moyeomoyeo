import { ApiProperty } from '@nestjs/swagger';

export class UserNameUniqueResponse {
  @ApiProperty({
    example: true,
    description: '이미 점유된 닉네임인지 불리언 값으로 알려줌',
    required: true,
  })
  isOccupied: boolean;

  static from(isOccupied: boolean) {
    const response = new UserNameUniqueResponse();
    response.isOccupied = isOccupied;
    return response;
  }
}
