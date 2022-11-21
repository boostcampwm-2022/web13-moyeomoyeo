import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { AppConfigService } from './common/config/app/config.service';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { BadParameterException } from './common/exception/bad-parameter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
