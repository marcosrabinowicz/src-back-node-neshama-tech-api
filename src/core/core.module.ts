import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Global()
@Module({
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [],
})
export class CoreModule {}
