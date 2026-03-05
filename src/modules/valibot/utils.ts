import * as v from 'valibot';

export function vStringToNumber() {
  return v.pipe(v.string(), v.toNumber());
}