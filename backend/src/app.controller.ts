import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ResponseEntity } from '@common/response-entity';
import { ApiSuccessResponse } from '@decorator/api-success-resposne.decorator';
import { ApiErrorResponse } from '@decorator/api-error-response.decorator';
import { BadParameterException } from '@exception/bad-parameter.exception';
import { ApiNotFoundException } from '@exception/api-not-found.exception';
import { AppService } from '@src/app.service';
import { JwtAuth } from '@decorator/jwt-auth.decorator';

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
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, String)
  @ApiErrorResponse(BadParameterException, ApiNotFoundException)
  getHello(@Param() params: ExampleDto) {
    if (params.id < 10) throw new ApiNotFoundException();
    return ResponseEntity.OK_WITH_DATA(this.appService.getHello());
  }
}
