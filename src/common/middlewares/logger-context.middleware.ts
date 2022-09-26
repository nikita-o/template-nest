import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LoggerContextMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(req.originalUrl);
    next();
  }
}
