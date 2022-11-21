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
import { ApiNotFoundException } from '../exception/api-not-found.exception';
import { BadParameterException } from '../exception/bad-parameter.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const convertedException = this.convertException(exception);

    const httpStatus = convertedException.getStatus();
    const response = convertedException.getResponse();

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
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
