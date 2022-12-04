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
    private readonly appConfigService: AppConfigService,
  ) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const entityPath = path.resolve(
      __dirname,
      '../../../../**/*.entity.{js,ts}',
    );

    return {
      type: 'mysql',
      host: this.mysqlConfigService.hostname,
      username: this.mysqlConfigService.username,
      password: this.mysqlConfigService.password,
      database: this.mysqlConfigService.database,
      port: this.mysqlConfigService.port,
      synchronize: !this.appConfigService.isPrduction(),
      logging: this.appConfigService.isDevelopment()
        ? 'all'
        : ['error', 'warn'],
      entities: [entityPath],
      dropSchema: this.appConfigService.isTest(),
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'Z',
      poolSize: 50,
    };
  }
}
