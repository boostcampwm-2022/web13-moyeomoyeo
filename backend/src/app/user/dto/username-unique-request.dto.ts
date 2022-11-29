import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserNameUniqueRequest {
  @ApiProperty({
    example: 'pythonstrup',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  userName: string;
}
