import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { DbUniqueConstraintViolationError } from '../error/db-unique-constraint-violation-error.js';
import { getProp } from '../../ts-utils/get-prop.js';

/**
 * Wraps a Prisma query in a try-catch block to handle Prisma errors.
 */
export async function prismaErrorBoundary<T>(
  query: () => Promise<T>,
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      throw error;
    }
    const kind = getProp<string | undefined>(
      error,
      'meta.driverAdapterError.cause.kind',
    );
    switch (kind) {
      case 'UniqueConstraintViolation':
        throw DbUniqueConstraintViolationError.fromPrisma(error);
      default:
        throw error;
    }
  }
}
