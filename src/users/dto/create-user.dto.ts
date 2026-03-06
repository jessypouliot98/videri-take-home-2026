import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';

export class CreateUserDto extends createZodDto(
  z.object({
    email: z.email(),
    name: z.string(),
    organizationId: z.uuid(),
  }),
) {}
