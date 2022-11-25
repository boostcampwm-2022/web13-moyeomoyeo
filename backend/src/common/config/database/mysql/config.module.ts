import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MysqlConfigService } from '@config/database/mysql/config.service';
import { mysqlConfig } from '@config/database/mysql/configuration';

@Module({
  imports: [ConfigModule.forFeature(mysqlConfig)],
  providers: [MysqlConfigService],
  exports: [MysqlConfigService],
})
export class MysqlConfigModule {}
