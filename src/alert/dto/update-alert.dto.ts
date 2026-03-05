import * as v from 'valibot';
import { SchemaCreateAlert } from './create-alert.dto.js';
import { StandardSchemaV1 } from '@standard-schema/spec';

export const SchemaUpdateAlert = v.partial(SchemaCreateAlert);

export type UpdateAlertDto = StandardSchemaV1.InferOutput<
  typeof SchemaUpdateAlert
>;
