import { Module } from '@nestjs/common';
import { S3ConfigService } from '@config/s3/config.service';
import { ConfigModule } from '@nestjs/config';
import { s3Config } from '@config/s3/configuration';

@Module({
  imports: [ConfigModule.forFeature(s3Config)],
  providers: [S3ConfigService],
  exports: [S3ConfigService],
})
export class S3ConfigModule {}
