import * as v from 'valibot';

export const SchemaCreateOrganization = v.object({
  name: v.pipe(
    v.string('Name must be a string'),
    v.minLength(1, 'Name must not be empty'),
    v.maxLength(255, 'Name must not exceed 255 characters'),
  ),
});
export type CreateOrganizationDto = v.InferOutput<
  typeof SchemaCreateOrganization
>;
