import { HttpException } from '@nestjs/common/exceptions/http.exception.js';

export abstract class AppHttpError extends Error {
  abstract toNestHttpException(this: AppHttpError): HttpException;
}