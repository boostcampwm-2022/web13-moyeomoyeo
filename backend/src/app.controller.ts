import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { AppService } from './app.service';
import { ResponseEntity } from './common/response-entity';
import { ApiSuccessResponse } from './common/decorator/api-success-resposne.decorator';
import { BadParameterException } from './common/exception/bad-parameter.exception';
import { ApiErrorResponse } from './common/decorator/api-error-response.decorator';
import { ApiNotFoundException } from './common/exception/api-not-found.exception';

export class ExampleDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 1 })
  id: number;
}

@Controller()
@ApiTags('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(HttpStatus.OK, String)
  @ApiErrorResponse(BadParameterException, ApiNotFoundException)
  getHello(@Param() params: ExampleDto) {
    if (params.id < 10) throw new ApiNotFoundException();
    return ResponseEntity.OK_WITH_DATA(this.appService.getHello());
  }
}
