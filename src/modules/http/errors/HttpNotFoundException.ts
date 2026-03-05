import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception.js';

export class HttpNotFoundException extends HttpException {
  constructor(message?: string, options?: HttpExceptionOptions) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: message ?? 'Not Found',
      },
      HttpStatus.NOT_FOUND,
      options,
    );
  }
}