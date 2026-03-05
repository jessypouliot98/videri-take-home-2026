import * as v from 'valibot';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { AlertStatus } from '../../../generated/prisma/enums.js';

export const SchemaCreateAlert = v.object({
  title: v.string(),
  description: v.string(),
  status: v.enum(AlertStatus),
  createdById: v.pipe(v.string(), v.uuid()),
  organizationId: v.pipe(v.string(), v.uuid()),
});

export type CreateAlertDto = StandardSchemaV1.InferOutput<
  typeof SchemaCreateAlert
>;
