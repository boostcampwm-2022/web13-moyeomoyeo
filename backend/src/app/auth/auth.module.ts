import { Module } from '@nestjs/common';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { GithubConfigModule } from '@config/github/config.module';
import { GithubStrategy } from '@app/auth/github.strategy';

@Module({
  imports: [PassportModule, GithubConfigModule],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
