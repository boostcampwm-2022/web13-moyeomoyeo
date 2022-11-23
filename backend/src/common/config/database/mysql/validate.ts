import { IsNumber, IsString, validateSync } from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';

export class MysqlConfig {
  @IsString()
  @Expose()
  MYSQL_HOST: string;

  @IsString()
  @Expose()
  MYSQL_DATABASE: string;

  @IsString()
  @Expose()
  MYSQL_USER: string;

  @IsString()
  @Expose()
  MYSQL_PASSWORD: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  MYSQL_PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    MysqlConfig,
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
