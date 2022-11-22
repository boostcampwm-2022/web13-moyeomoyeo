import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseEntity } from './common/response-entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from './common/decorator/api-success-resposne.decorator';

@Controller()
@ApiTags('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiSuccessResponse(HttpStatus.OK)
  getHello() {
    return ResponseEntity.OK_WITH_DATA(this.appService.getHello());
  }
}
