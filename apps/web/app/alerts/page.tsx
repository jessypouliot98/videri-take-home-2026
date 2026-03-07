'use client'

import { useApi } from '@/api/QueryProvider';
import { useMemo } from 'react';
import { format } from 'date-fns';

export default function Alerts() {
  const api = useApi();
  const infiniteAlertsQuery = api.useInfiniteQuery(
    'get',
    '/alerts',
    {
      params: {
        query: { status: 'NEW' }
      }
    },
    {
      initialPageParam: null,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const tableBody = useMemo(() => {
    const COL_SPAN = 3;
    if (infiniteAlertsQuery.isError) {
      return (
        <tbody>
          <tr>
            <td colSpan={COL_SPAN}>Error</td>
          </tr>
        </tbody>
      )
    }
    if (infiniteAlertsQuery.isLoading) {
      return (
        <tbody>
          <tr>
            <td colSpan={COL_SPAN}>Loading...</td>
          </tr>
        </tbody>
      )
    }
    const items = infiniteAlertsQuery.data!.pages.flatMap((page) => page.items);
    if (items.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={COL_SPAN}>No results, try adjusting your filters or create your first alert!</td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {items.map((alert) => (
          <tr
            key={alert.id}
            className="bg-blue-500"
          >
            <td>{alert.title}</td>
            <td>{alert.status}</td>
            <td>{format(alert.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
          </tr>
        ))}
      </tbody>
    )
  }, [infiniteAlertsQuery])
  return (
    <table className="w-full">
      {tableBody}
    </table>
  );
}
