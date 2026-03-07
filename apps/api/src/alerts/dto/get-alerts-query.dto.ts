import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { AlertStatus } from '../../../generated/prisma/enums.js';

type Cursor = { mode: 'prev' | 'next'; value: string };

export class GetAlertsQueryDto extends createZodDto(
  z.object({
    status: z.enum(AlertStatus).optional(),
    cursor: z
      .string()
      .transform((v): Cursor => {
        if (v.includes(':')) {
          const [modeStr, cursor] = v.split(':');
          return {
            mode: modeStr === 'prev' ? 'prev' : 'next',
            value: cursor,
          };
        }
        return { mode: 'next', value: v };
      })
      .optional(),
  }),
) {}
