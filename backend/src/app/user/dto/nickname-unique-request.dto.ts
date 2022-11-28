import { ApiProperty } from '@nestjs/swagger';

export class NicknameUniqueRequest {
  @ApiProperty({
    example: 'pythonstrup',
    description: '유저 이름',
    required: true,
  })
  username: string;
}
