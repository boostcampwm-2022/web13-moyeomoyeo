import { IsEnum, IsOptional } from 'class-validator';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { ApiProperty } from '@nestjs/swagger';
import { NoOffsetPageRequest } from '@common/dto/no-offset-page-request';

export class V2SearchGroupArticlesRequest extends NoOffsetPageRequest {
  @IsOptional()
  @IsEnum(CATEGORY)
  @ApiProperty({ example: CATEGORY.STUDY, enum: CATEGORY, required: false })
  category?: CATEGORY;

  @IsOptional()
  @IsEnum(LOCATION)
  @ApiProperty({ example: LOCATION.ONLINE, enum: LOCATION, required: false })
  location?: LOCATION;

  @IsOptional()
  @IsEnum(GROUP_STATUS)
  @ApiProperty({
    example: GROUP_STATUS.PROGRESS,
    enum: GROUP_STATUS,
    required: false,
  })
  status?: GROUP_STATUS;
}
