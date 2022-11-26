import { Module } from '@nestjs/common';
import { S3ConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentFilePath, isIgnoreEnvFile } from '../config-option';
import { validate } from './validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFilePath(),
      ignoreEnvFile: isIgnoreEnvFile(),
      validate,
    }),
  ],
  providers: [S3ConfigService],
  exports: [S3ConfigService],
})
export class S3ConfigModule {}
