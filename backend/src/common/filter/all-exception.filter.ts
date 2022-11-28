import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { instanceToPlain } from 'class-transformer';
import { ApiNotFoundException } from '@exception/api-not-found.exception';
import { BadParameterException } from '@exception/bad-parameter.exception';
import { ResponseEntity } from '@common/response-entity';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(exception, exception.stack);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const convertedException = this.convertException(exception);

    const httpStatus = convertedException.getStatus();
    const { status, message, ...data } = convertedException.getResponse() as {
      status: string;
      message: string;
      [key: string]: any;
    };

    httpAdapter.reply(
      ctx.getResponse(),
      instanceToPlain(ResponseEntity.ERROR_WITH_DATA(message, status, data)),
      httpStatus,
    );
  }

  convertException(exception: Error) {
    if (!(exception instanceof HttpException)) {
      return new InternalServerErrorException();
    }

    if (exception.name === NotFoundException.name) {
      return new ApiNotFoundException();
    }

    if (exception.name === BadRequestException.name) {
      return new BadParameterException(exception.message);
    }

    return exception;
  }
}
