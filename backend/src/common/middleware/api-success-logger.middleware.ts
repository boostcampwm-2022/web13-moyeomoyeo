import * as morgan from 'morgan';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiSuccessLoggerMiddleware implements NestMiddleware {
  private readonly successResponseFormat = `:ip - :method :url :status :response-time ms - :res[content-length]`;

  private readonly logger = new Logger(ApiSuccessLoggerMiddleware.name);

  constructor() {
    morgan.token('ip', (req: Request) => req.ip);
  }

  use(req: any, res: any, next: (error?: any) => void) {
    return morgan(this.successResponseFormat, {
      skip: (_req, _res) => _res.statusCode >= 400,
      stream: {
        write: (message) => this.logger.log(message.trim()),
      },
    })(req, res, next);
  }
}
