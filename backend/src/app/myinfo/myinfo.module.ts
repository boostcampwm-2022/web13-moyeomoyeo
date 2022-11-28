import { Module } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { MyInfoController } from '@app/myinfo/myinfo.controller';
import { MyInfoService } from '@app/myinfo/myinfo.service';
import { JwtTokenModule } from '@src/common/module/jwt-token/jwt-token.module';

@Module({
  imports: [JwtTokenModule],
  controllers: [MyInfoController],
  providers: [UserRepository, MyInfoService],
})
export class MyInfoModule {}
