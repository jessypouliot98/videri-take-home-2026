import { HttpException } from '@nestjs/common/exceptions/http.exception.js';

export abstract class DatabaseHttpError extends Error {
  abstract toNestHttpException(this: DatabaseHttpError): HttpException;
}
