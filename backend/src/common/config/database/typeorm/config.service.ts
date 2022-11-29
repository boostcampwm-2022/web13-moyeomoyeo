import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlConfigService } from '@config/database/mysql/config.service';
import { AppConfigService } from '@config/app/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly mysqlConfigService: MysqlConfigService,
    private readonly appConfigServce: AppConfigService,
  ) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const entityPath = path.resolve(
      __dirname,
      '../../../../**/*.entity.{js,ts}',
    );

    return {
      type: 'mysql',
      name: connectionName,
      host: this.mysqlConfigService.hostname,
      username: this.mysqlConfigService.username,
      password: this.mysqlConfigService.password,
      database: this.mysqlConfigService.database,
      port: this.mysqlConfigService.port,
      synchronize: !this.appConfigServce.isPrduction(),
      logging: this.appConfigServce.isDevelopment() ? 'all' : ['error', 'warn'],
      entities: [entityPath],
      dropSchema: this.appConfigServce.isTest(),
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'Z',
    };
  }
}
