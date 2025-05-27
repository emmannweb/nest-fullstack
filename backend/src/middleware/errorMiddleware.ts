import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as {
      message: string;
      errorCode?: number;
    };
    const message = exceptionResponse.message;
    const errorCode = exceptionResponse.errorCode;

    response.status(status).json({
      statusCode: status,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    });
  }
}
