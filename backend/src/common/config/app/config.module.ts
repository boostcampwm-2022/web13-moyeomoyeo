import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@config/app/configuration';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
