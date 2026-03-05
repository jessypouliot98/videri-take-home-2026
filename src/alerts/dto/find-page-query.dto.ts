import * as v from 'valibot';
import { AlertStatus } from '../../../generated/prisma/enums.js';
import { vStringToNumber } from '../../modules/valibot/utils.js';

export const SchemaFindPageQuery = v.object({
  page: v.fallback(vStringToNumber(), 1),
  size: v.fallback(vStringToNumber(), 20),
  status: v.fallback(v.optional(v.enum(AlertStatus)), undefined),
});
export type FindPageQueryDto = v.InferOutput<typeof SchemaFindPageQuery>;
