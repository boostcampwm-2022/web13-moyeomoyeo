import { IsString, IsUrl, validateSync } from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';

export class S3Config {
  @IsString()
  @Type(() => String)
  @Expose()
  STORAGE_ACCESSKEY: string;

  @IsString()
  @Type(() => String)
  @Expose()
  STORAGE_SECRETKEY: string;

  @IsString()
  @Type(() => String)
  @Expose()
  STORAGE_REGION: string;

  @IsUrl()
  @Type(() => String)
  @Expose()
  STORAGE_ENDPOINT: string;

  @IsString()
  @Type(() => String)
  @Expose()
  STORAGE_BUCKET: string;

  @IsString()
  @Type(() => String)
  @Expose()
  STORAGE_BUCKET_PATH: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    S3Config,
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
