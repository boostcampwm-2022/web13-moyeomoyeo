import { Module } from '@nestjs/common';
import { MysqlConfigModule } from '@config/database/mysql/config.module';
import { AppConfigModule } from '@config/app/config.module';
import { TypeOrmConfigService } from '@config/database/typeorm/config.service';

@Module({
  imports: [MysqlConfigModule, AppConfigModule],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
