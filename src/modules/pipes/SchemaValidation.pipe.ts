import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import type { StandardSchemaV1 } from '@standard-schema/spec';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: StandardSchemaV1) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      return this.schema['~standard'].validate(value);
    } catch (error) {
      throw new BadRequestException('Validation failed', { cause: error });
    }
  }
}
