import { IsString, IsUrl, validateSync } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';

export class S3Config {
  @IsString()
  @Expose()
  STORAGE_ACCESSKEY: string;

  @IsString()
  @Expose()
  STORAGE_SECRETKEY: string;

  @IsString()
  @Expose()
  STORAGE_REGION: string;

  @IsUrl()
  @Expose()
  STORAGE_ENDPOINT: string;

  @IsString()
  @Expose()
  STORAGE_BUCKET: string;

  @IsString()
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
