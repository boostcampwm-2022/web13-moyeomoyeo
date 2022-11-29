import { Inject, Injectable } from '@nestjs/common';
import { cookieConfig } from '@config/cookie/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CookieConfigService {
  constructor(
    @Inject(cookieConfig.KEY)
    private readonly cookieConfiguration: ConfigType<typeof cookieConfig>,
  ) {}

  get secure() {
    return this.cookieConfiguration.SECURE;
  }

  get sameSite() {
    if (this.cookieConfiguration.SECURE) return 'none';

    return 'lax';
  }
}
