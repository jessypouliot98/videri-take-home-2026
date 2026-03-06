import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { zDateCodec } from '../../../lib/zod/api.js';

export class UserDto extends createZodDto(
  z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
    createdAt: zDateCodec,
    updatedAt: zDateCodec,
  }),
  { codec: true },
) {}
