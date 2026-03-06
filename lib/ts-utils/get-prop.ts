/**
 * Unsafe, but convenient way to get a property from an object using a dot-separated path.
 */
export function getProp<T = unknown>(obj: object, path: string) {
  const [next, ...rest] = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value = obj[next];
  if (rest.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return getProp(value, rest.join('.'));
  }
  return value as T;
}