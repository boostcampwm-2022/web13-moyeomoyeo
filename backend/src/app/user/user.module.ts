import { Module } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { JwtTokenModule } from '@src/common/module/jwt-token/jwt-token.module';

@Module({
  imports: [JwtTokenModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
