import { Body, Controller, Get, HttpStatus, Put } from '@nestjs/common';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { MyInfoService } from '@app/myinfo/myinfo.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { MyInfoGetResponse } from '@app/myinfo/dto/myinfo-get-response.dto';
import { ResponseEntity } from '@src/common/response-entity';
import { CurrentUser } from '@src/common/decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { ProfileModifyingRequest } from '@app/myinfo/dto/profile-modifying-request.dto';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { UserNameDuplicateException } from '@app/myinfo/exception/username-duplicate.exception';

@Controller('/my-info')
@JwtAuth()
@ApiTags('MyInfo')
export class MyInfoController {
  constructor(private readonly myInfoService: MyInfoService) {}

  @Get('/')
  @ApiSuccessResponse(HttpStatus.OK, MyInfoGetResponse)
  async getMyInfo(@CurrentUser() user: User) {
    const data = MyInfoGetResponse.from(user);
    return ResponseEntity.OK_WITH_DATA(data);
  }

  @Put('/')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(UserNameDuplicateException)
  async modifyProfile(
    @CurrentUser() user: User,
    @Body() profileModifyingRequest: ProfileModifyingRequest,
  ) {
    await this.myInfoService.updateProfile(user, profileModifyingRequest);
    return ResponseEntity.NO_CONTENT();
  }
}
