import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';

export class CreateAlertDto extends createZodDto(
  z.object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title cannot be longer than 255 characters'),
  }),
) {}
