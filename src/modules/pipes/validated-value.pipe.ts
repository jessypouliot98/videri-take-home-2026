import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { StandardSchemaV1 } from '@standard-schema/spec';

@Injectable()
export class ValidatedValuePipe<TIn, TOut = TIn> implements PipeTransform {
  constructor(private validator: StandardSchemaV1<TIn, TOut>) {}

  transform(value: unknown, _metadata: ArgumentMetadata): TOut {
    const result = this.validator['~standard'].validate(value);
    if (result instanceof Promise) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (result.issues) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
        },
        HttpStatus.BAD_REQUEST,
        { cause: result.issues },
      );
    }
    return result.value;
  }
}
