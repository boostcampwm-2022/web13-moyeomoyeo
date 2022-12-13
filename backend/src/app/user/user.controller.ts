import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { UserNameUniqueRequest } from '@src/app/user/dto/username-unique-request.dto';
import { UserNameUniqueResponse } from '@src/app/user/dto/username-unique-response.dto';
import { ResponseEntity } from '@src/common/response-entity';
import { UserInfoResopnse } from './dto/user-info-response.dto';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { UserNotFoundException } from '@app/user/exception/user-not-found.exception';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, UserInfoResopnse)
  @ApiErrorResponse(UserNotFoundException)
  async getUserInfo(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);
    const data = UserInfoResopnse.from(user);
    return ResponseEntity.OK_WITH_DATA(data);
  }

  @Post('username/is-occupied')
  @JwtAuth()
  @ApiSuccessResponse(HttpStatus.OK, UserNameUniqueResponse)
  async checkUsernameUnique(
    @Body() userNameUniqueRequest: UserNameUniqueRequest,
  ) {
    const result = await this.userService.checkUsernameUnique(
      userNameUniqueRequest.userName,
    );
    const data = UserNameUniqueResponse.from(result);
    return ResponseEntity.OK_WITH_DATA(data);
  }
}
