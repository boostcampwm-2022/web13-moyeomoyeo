import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NoOffsetPageRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
    description: '가져올 데이터 수(default: 10)',
    required: false,
  })
  limit = 10;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
    description: '다음 아이디',
    required: false,
  })
  nextId?: number;
}
