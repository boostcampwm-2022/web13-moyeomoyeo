import { Module } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { MyInfoController } from '@app/myinfo/myinfo.controller';
import { MyInfoService } from '@app/myinfo/myinfo.service';

@Module({
  controllers: [MyInfoController],
  providers: [UserRepository, MyInfoService],
})
export class MyInfoModule {}
