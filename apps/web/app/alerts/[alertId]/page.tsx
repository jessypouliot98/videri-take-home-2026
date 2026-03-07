'use client'

import { useApi } from '@/api/QueryProvider';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'next/dist/client/components/navigation';
import { getErrorMessage } from '@/utils/get-error-message';

export default function Alert() {
  const { alertId } = useParams<{ alertId: string }>()

  const api = useApi();
  const alertQuery = api.useQuery(
    'get',
    '/alerts/{alertId}',
    {
      params: {
        path: { alertId },
      },
    },
  )
  const alertEventsQuery = api.useQuery(
    'get',
    '/alerts/{alertId}/events',
    {
      params: {
        path: { alertId },
      },
    },
  );

  const tableBody = useMemo(() => {
    const COL_SPAN = 4;
    if (alertEventsQuery.isError) {
      return (
        <tbody>
        <tr>
          <td
            className="p-2"
            colSpan={COL_SPAN}
          >
            {getErrorMessage(alertEventsQuery.error)}
          </td>
        </tr>
        </tbody>
      )
    }
    if (alertEventsQuery.isLoading) {
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
    if (alertEventsQuery.data!.length === 0) {
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
        {alertEventsQuery.data!.map((event) => (
          <tr
            key={event.id}
            className="bg-white odd:bg-neutral-100"
          >
            <td className="p-2">{event.fromStatus}</td>
            <td className="p-2">{event.toStatus}</td>
            <td className="p-2">{format(event.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
          </tr>
        ))}
      </tbody>
    )
  }, [alertEventsQuery])

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">Alert Events</h1>
      <h2>{alertQuery.data?.title ?? "Loading..."}</h2>
      <div className="flex gap-2">
        <div>Status: {alertQuery.data?.status ?? "Loading..."}</div>
        <div>Created At: {format(alertQuery.data?.createdAt ?? new Date(), 'yyyy-MM-dd HH:mm:ss')}</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-300">
            <th className="text-left p-2">From</th>
            <th className="text-left p-2">To</th>
            <th className="text-left p-2">Timestamp</th>
          </tr>
        </thead>
        {tableBody}
      </table>
    </div>
  );
}
