import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { instanceToPlain } from 'class-transformer';
import { ApiNotFoundException } from '../exception/api-not-found.exception';
import { BadParameterException } from '../exception/bad-parameter.exception';
import { ResponseEntity } from '../response-entity';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
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
      instanceToPlain(ResponseEntity.ERROR_WITH_DATA(status, message, data)),
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
