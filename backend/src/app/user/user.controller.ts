import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { NicknameUniqueRequest } from '@app/user//dto/nickname-unique-request.dto';
import { NicknameUniqueResponse } from '@app/user/dto/nickname-unique-response.dto';
import { ResponseEntity } from '@src/common/response-entity';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @JwtAuth()
  getUserInfo() {
    return '';
  }

  @Post('nickname/is-occupied')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, NicknameUniqueResponse)
  checkUsernameUnique(@Body() nicknameUniqueRequest: NicknameUniqueRequest) {
    const result = this.userService.checkUsernameUnique(
      nicknameUniqueRequest.username,
    );
    const data = NicknameUniqueResponse.from(result);
    return ResponseEntity.OK_WITH_DATA(data);
  }
}
