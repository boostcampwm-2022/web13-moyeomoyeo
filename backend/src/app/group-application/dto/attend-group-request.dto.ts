import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AttendGroupRequest {
  @ApiProperty({
    example: 1,
    description: '그룹 아이디',
    required: true,
  })
  @IsNumber()
  groupArticleId: number;
}
