import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import type { Request as ExpressRequest } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const { method, originalUrl } = req;
    const started = Date.now();

    this.logger.log(`→ ${method} ${originalUrl}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - started;
          this.logger.log(`← ${method} ${originalUrl} (${ms} ms)`);
        },
        error: (err: unknown) => {
          const ms = Date.now() - started;
          const msg =
            err instanceof Error
              ? err.message
              : typeof err === 'string'
                ? err
                : JSON.stringify(err);

          this.logger.error(`✖ ${method} ${originalUrl} (${ms} ms) :: ${msg}`);
        },
      })
    );
  }
}
