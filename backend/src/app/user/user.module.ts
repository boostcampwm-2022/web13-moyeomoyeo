import { Module } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
