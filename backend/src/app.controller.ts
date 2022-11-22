import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseEntity } from './common/response-entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return ResponseEntity.OK_WITH_DATA(this.appService.getHello());
  }
}
