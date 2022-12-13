import { IsString, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';

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

export const s3Config = registerAs('S3', () => validate(process.env, S3Config));
