import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';
    if (isHttp) {
      const response = exception.getResponse() as
        | string
        | { message?: string | string[]; [key: string]: any };
      if (typeof response === 'string') {
        message = response;
      } else if (response?.message) {
        message = response.message;
      }
    }

    const errorBody = {
      statusCode: status,
      error: isHttp ? HttpStatus[status] : 'InternalServerError',
      message,
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    };

    res.status(status).json(errorBody);
  }
}
