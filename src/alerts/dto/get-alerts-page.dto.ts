import { createZodDto } from 'nestjs-zod';
import { zKeySetPagination } from '../../../lib/zod/api.js';
import { AlertDto } from './alert.dto.js';

export class GetAlertsPageDto extends createZodDto(
  zKeySetPagination(AlertDto.schema),
  { codec: true },
) {}
