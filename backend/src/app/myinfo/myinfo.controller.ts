import { Controller, Get, HttpStatus, Put } from '@nestjs/common';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { MyInfoService } from '@app/myinfo/myinfo.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { MyInfoGetResponse } from './dto/myinfo-get-response.dto';
import { ResponseEntity } from '@src/common/response-entity';
import { CurrentUser } from '@src/common/decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';

@Controller('/my-info')
@JwtAuth()
@ApiTags('MyInfo')
export class MyInfoController {
  constructor(private readonly myInfoService: MyInfoService) {}

  @Get()
  @ApiSuccessResponse(HttpStatus.OK, MyInfoGetResponse)
  getMyInfo(@CurrentUser() user: User) {
    const data = MyInfoGetResponse.from(user);
    return ResponseEntity.OK_WITH_DATA(data);
  }

  @Put()
  modifyMyInfo() {
    return '';
  }
}
