import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(NotFoundException)
export class ApiNotFoundFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    httpAdapter.reply(
      ctx.getResponse(),
      {
        errorCode: 'API_NOT_FOUND',
        message: '해당하는 API가 존재하지 않습니다',
      },
      404,
    );
  }
}
