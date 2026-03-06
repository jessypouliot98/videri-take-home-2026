import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { zDateCodec } from '../../../lib/zod/api.js';
import { AlertStatus } from '../../../generated/prisma/enums.js';

export class AlertDto extends createZodDto(
  z.object({
    id: z.uuid(),
    title: z.string(),
    status: z.enum(AlertStatus),
    organizationId: z.uuid(),
    createdById: z.uuid(),
    createdAt: zDateCodec,
    updatedAt: zDateCodec,
  }),
  { codec: true },
) {}
