'use client'

import { useApi } from '@/api/QueryProvider';
import { useMemo } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

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
    const COL_SPAN = 4;
    if (infiniteAlertsQuery.isError) {
      return (
        <tbody>
          <tr>
            <td
              className="p-2"
              colSpan={COL_SPAN}
            >
              Error
            </td>
          </tr>
        </tbody>
      )
    }
    if (infiniteAlertsQuery.isLoading) {
      return (
        <tbody>
          <tr>
            <td
              className="p-2"
              colSpan={COL_SPAN}
            >
              Loading...
            </td>
          </tr>
        </tbody>
      )
    }
    const items = infiniteAlertsQuery.data!.pages.flatMap((page) => page.items);
    if (items.length === 0) {
      return (
        <tbody>
          <tr>
            <td
              className="p-2"
              colSpan={COL_SPAN}
            >
              No results, try adjusting your filters or create your first alert!
            </td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {items.map((alert) => (
          <tr
            key={alert.id}
            className="bg-white odd:bg-neutral-100"
          >
            <td className="p-2">{alert.title}</td>
            <td className="p-2">{alert.status}</td>
            <td className="p-2">{format(alert.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
            <td className="p-2">
              <Link
                href={`/alerts/${alert.id}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Alert Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }, [infiniteAlertsQuery])

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">Alerts</h1>
      <table className="w-full">
        {tableBody}
      </table>
    </div>
  );
}
