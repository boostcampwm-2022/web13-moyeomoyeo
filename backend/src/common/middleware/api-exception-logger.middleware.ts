import * as morgan from 'morgan';
import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class ApiExceptionLoggerMiddleware implements NestMiddleware {
  private readonly errorResponseFormat = `:ip - :method :url :status - :response-time ms`;

  private readonly logger = new Logger(ApiExceptionLoggerMiddleware.name);

  constructor() {
    morgan.token('ip', (req: Request) => req.ip);
  }

  use(req: any, res: any, next: (error?: any) => void): any {
    return morgan(this.errorResponseFormat, {
      skip: (_req: Request, _res: Response) => _res.statusCode < 400,
      stream: {
        write: (message) => this.logger.error(message.trim()),
      },
    })(req, res, next);
  }
}
