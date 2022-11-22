import { HttpAdapterHost, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BadParameterException } from '@exception/bad-parameter.exception';
import { AllExceptionFilter } from '@filter/all-exception.filter';

export const setNestApp = (app: INestApplication) => {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new BadParameterException(
          Object.values(validationErrors[0].constraints).join(','),
        );
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
};
