import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, NodeEnv } from './validate';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  get port() {
    return this.configService.get('PORT', { infer: true });
  }

  get env() {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  isDevelopment() {
    return this.env === NodeEnv.DEVELOPMENT;
  }

  isPrduction() {
    return this.env === NodeEnv.PRODUCTION;
  }

  isTest() {
    return this.env === NodeEnv.TEST;
  }
}
