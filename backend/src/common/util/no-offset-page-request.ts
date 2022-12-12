import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NoOffsetPageRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(30)
  @ApiProperty({
    type: Number,
    example: 10,
    description: '가져올 데이터 수(default: 10)',
    minimum: 1,
    maximum: 30,
    required: false,
  })
  limit = 10;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 50,
    description: '다음 아이디',
    required: false,
  })
  nextId?: number;
}
