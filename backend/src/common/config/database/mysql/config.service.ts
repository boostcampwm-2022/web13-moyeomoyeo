import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MysqlConfig } from '@config/database/mysql/validate';

@Injectable()
export class MysqlConfigService {
  constructor(
    private readonly configService: ConfigService<MysqlConfig, true>,
  ) {}

  get port() {
    return this.configService.get('MYSQL_PORT', { infer: true });
  }

  get hostname() {
    return this.configService.get('MYSQL_HOST', { infer: true });
  }

  get username() {
    return this.configService.get('MYSQL_USER', { infer: true });
  }

  get password() {
    return this.configService.get('MYSQL_PASSWORD', { infer: true });
  }

  get database() {
    return this.configService.get('MYSQL_DATABASE', { infer: true });
  }
}
