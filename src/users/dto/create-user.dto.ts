import * as v from 'valibot';

export const SchemaCreateUser = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.pipe(
    v.string('Name must be a string'),
    v.minLength(1, 'Name must not be empty'),
    v.maxLength(255, 'Name must not exceed 255 characters'),
  ),
  organizationId: v.pipe(v.string(), v.uuid()),
});
export type CreateUserDto = v.InferOutput<typeof SchemaCreateUser>;
