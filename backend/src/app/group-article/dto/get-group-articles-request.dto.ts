import { NoOffsetPageRequest } from '@common/no-offset-page-request';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetGroupArticlesRequest extends NoOffsetPageRequest {
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
