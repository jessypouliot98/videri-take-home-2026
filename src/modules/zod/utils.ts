import z from 'zod/v4';

export function zStringToNumber() {
  return z.string().transform((val, ctx) => {
    const number = Number(val);
    if (Number.isNaN(number)) {
      ctx.addIssue({
        code: 'invalid_type',
        message: 'must be a valid number',
        expected: 'number',
      });
      return z.NEVER;
    }
    return number;
  });
}
