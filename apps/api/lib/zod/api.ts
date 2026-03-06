import z from 'zod/v4';

export const zDateCodec = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

export function zKeySetPagination<T extends z.ZodType>(dto: T) {
  return z.object({
    prevCursor: z.object({
      mode: z.literal('prev'),
      value: z.string().optional(),
    }),
    nextCursor: z.object({
      mode: z.literal('next'),
      value: z.string().optional(),
    }),
    items: z.array(dto),
  });
}
