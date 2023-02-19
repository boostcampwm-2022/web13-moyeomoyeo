import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PageRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
    description: '페이지 번호',
    required: false,
  })
  currentPage = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    example: 10,
    description: '페이지당 데이터 개수',
    required: false,
  })
  countPerPage = 10;

  getLimit() {
    return this.countPerPage;
  }

  getOffset() {
    return this.countPerPage * (this.currentPage - 1);
  }
}
