import { DatabaseHttpError } from './database-http-error.js';
import { BadRequestException, HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export class DbUniqueConstraintViolationError extends DatabaseHttpError {
  static fromPrisma(error: PrismaClientKnownRequestError) {
    return new DbUniqueConstraintViolationError(
      'Duplicate entry for this field',
      { cause: error },
    );
  }
  toNestHttpException(): HttpException {
    return new BadRequestException(this.message, {
      cause: this.cause,
    });
  }
}
