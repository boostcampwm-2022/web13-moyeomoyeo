import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig, NodeEnv } from '@config/app/configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  get port() {
    return this.appConfiguration.PORT;
  }

  get env() {
    return this.appConfiguration.NODE_ENV;
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
