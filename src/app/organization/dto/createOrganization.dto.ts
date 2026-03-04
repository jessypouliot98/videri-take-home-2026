import * as v from "valibot";
import { StandardSchemaV1 } from "@standard-schema/spec";

export const SchemaCreateOrganization = v.pipe(
  v.object({
    name: v.pipe(
      v.string("Name must be a string"),
      v.minLength(1, "Name must not be empty"),
      v.maxLength(255, "Name must not exceed 255 characters"),
    ),
  }),
);
export type CreateOrganizationDto = StandardSchemaV1.InferOutput<
  typeof SchemaCreateOrganization
>;
