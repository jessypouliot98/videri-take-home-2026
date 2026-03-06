import { createZodDto } from 'nestjs-zod';
import { AlertStatus } from '../../../generated/prisma/enums.js';
import z from 'zod/v4';

export class GetAlertsDto extends createZodDto(
  z.object({
    status: z.enum(AlertStatus).optional(),
  }),
) {}
