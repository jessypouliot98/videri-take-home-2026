import { Query, QueryKey } from '@tanstack/react-query';

/**
 * Returns a predicate function that can be used to invalidate queries based on their queryKey.
 * Given openapi-react-query builds their queryKeys like ['get', /full/url, params],
 * it is impossible to fully clear every query in a given path with something like ['get', '/full']
 */
export function invalidateQueriesPredicate(targetQueryKey: QueryKey) {
  return (query: Query) => {
    return targetQueryKey.every((a, i) => {
      const b = query.queryKey[i];
      if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
      }
      return b.startsWith(a);
    })
  }
}