import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';

export class CreateOrganizationDto extends createZodDto(
  z.object({
    name: z
      .string()
      .min(1, 'Name cannot be empty')
      .max(255, 'Name cannot be longer than 255 characters'),
  }),
) {}
