import { Module } from '@nestjs/common';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
