import { IsNumber, IsString, validateSync } from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';

export class JwtConfig {
  @IsString()
  @Expose()
  JWT_SECRET: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  JWT_ACCESS_TOKEN_EXPIRATION_MINUTES: number;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  JWT_REFRESH_TOKEN_EXPIRATION_DAYS: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    JwtConfig,
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
