import { createZodDto } from 'nestjs-zod';
import { AlertStatus } from '../../../generated/prisma/enums.js';
import { zDateCodec } from '../../../lib/zod/api.js';
import z from 'zod/v4';

export class AlertEventDto extends createZodDto(
  z.object({
    id: z.uuid(),
    alertId: z.uuid(),
    fromStatus: z.enum(AlertStatus),
    toStatus: z.enum(AlertStatus),
    createdById: z.uuid(),
    createdAt: zDateCodec,
  }),
  { codec: true },
) {}
