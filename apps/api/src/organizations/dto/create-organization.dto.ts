import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';

export class CreateOrganizationDto extends createZodDto(
  z.object({
    name: z.string(),
  }),
) {}
