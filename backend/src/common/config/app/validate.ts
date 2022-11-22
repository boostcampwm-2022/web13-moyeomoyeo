import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';

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

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    AppConfig,
    { ...config },
    { enableImplicitConversion: true, excludeExtraneousValues: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
