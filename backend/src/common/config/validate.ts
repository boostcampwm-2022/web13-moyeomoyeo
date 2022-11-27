import { plainToClass, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validate = <T extends { constructor: any }>(
  config: Record<string, unknown>,
  envClass: ClassConstructor<T>,
): T => {
  const validatedConfig = plainToClass(envClass, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
