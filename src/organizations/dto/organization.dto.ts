import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { zDateCodec } from '../../../lib/zod/api.js';

export class OrganizationDto extends createZodDto(
  z.object({
    id: z.uuid(),
    name: z.string(),
    createdAt: zDateCodec,
    updatedAt: zDateCodec,
  }),
  { codec: true },
) {}
