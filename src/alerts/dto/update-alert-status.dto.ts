import * as v from 'valibot';
import { AlertStatus } from '../../../generated/prisma/enums.js';

export const SchemaUpdateAlertStatus = v.object({
  status: v.enum(AlertStatus),
});
export type UpdateAlertStatusDto = v.InferOutput<
  typeof SchemaUpdateAlertStatus
>;
