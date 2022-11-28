import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NoOffsetPageRequest {
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: true, example: 20, description: '가져올 개수' })
  limit: number;

  @IsOptional()
  @IsString()
  @Length(1)
  @ApiProperty({
    example: '1',
    required: false,
    description:
      '해당 조건 이하에 데이터를 가져오기 위한 커서. ex. articleId. 없는 경우 cursor가 들어가지 않는다',
  })
  cursor?: string;
}
