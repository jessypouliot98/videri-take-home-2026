import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { AlertStatus } from '../../../generated/prisma/enums.js';

export class UpdateAlertStatusDto extends createZodDto(
  z.object({
    status: z.enum(AlertStatus),
  }),
) {}
