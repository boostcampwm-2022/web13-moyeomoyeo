import { Module } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
