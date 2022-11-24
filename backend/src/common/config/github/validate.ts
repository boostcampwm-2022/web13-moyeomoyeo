import { IsString, validateSync } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';

export class GithubConfig {
  @IsString()
  @Expose()
  GITHUB_CLIENT_ID: string;

  @IsString()
  @Expose()
  GITHUB_CLIENT_SECRET: string;

  @IsString()
  @Expose()
  GITHUB_CALLBACK_URL: string;

  @IsString()
  @Expose()
  GITHUB_REDIRECT_URL: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    GithubConfig,
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
