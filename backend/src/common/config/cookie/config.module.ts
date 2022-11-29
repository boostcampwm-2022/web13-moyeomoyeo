import { Module } from '@nestjs/common';
import { CookieConfigService } from '@config/cookie/config.service';
import { ConfigModule } from '@nestjs/config';
import { cookieConfig } from '@config/cookie/configuration';

@Module({
  imports: [ConfigModule.forFeature(cookieConfig)],
  providers: [CookieConfigService],
  exports: [CookieConfigService],
})
export class CookieConfigModule {}
