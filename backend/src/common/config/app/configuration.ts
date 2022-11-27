import { validate } from '@config/validate';
import { IsEnum, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { registerAs } from '@nestjs/config';

export enum NodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

export class AppConfig {
  @IsNumber()
  @Type(() => Number)
  @Expose()
  PORT: number;

  @IsEnum(NodeEnv)
  @Expose()
  NODE_ENV: NodeEnv;
}

export const appConfig = registerAs('APP', () =>
  validate(process.env, AppConfig),
);
