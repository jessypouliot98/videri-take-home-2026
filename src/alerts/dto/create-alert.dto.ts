import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { AlertStatus } from '../../../generated/prisma/enums.js';

export class CreateAlertDto extends createZodDto(
  z.object({
    title: z.string(),
    status: z.enum(AlertStatus),
    organizationId: z.uuid(),
    createdById: z.uuid(),
  }),
) {}
