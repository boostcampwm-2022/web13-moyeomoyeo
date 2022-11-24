import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentFilePath, isIgnoreEnvFile } from '@config/config-option';
import { MysqlConfigService } from '@config/database/mysql/config.service';
import { validate } from '@config/database/mysql/validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFilePath(),
      ignoreEnvFile: isIgnoreEnvFile(),
      validate,
    }),
  ],
  providers: [MysqlConfigService],
  exports: [MysqlConfigService],
})
export class MysqlConfigModule {}
