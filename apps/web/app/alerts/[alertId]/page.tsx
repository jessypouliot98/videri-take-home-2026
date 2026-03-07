'use client'

import { useApi } from '@/api/QueryProvider';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'next/dist/client/components/navigation';
import { getErrorMessage } from '@/utils/get-error-message';
import { useQueryClient } from '@tanstack/react-query';
import { components } from '@pkg/api-contract/generated/openapi';
import { invalidateQueriesPredicate } from '@/api/utils/invalidate-queries-predicate';

export default function Alert() {
  const { alertId } = useParams<{ alertId: string }>()

  const api = useApi();
  const queryClient = useQueryClient();
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
  const updateStatusAction = api.useMutation(
    'patch',
    '/alerts/{alertId}/status',
    {
      onMutate: ({ body }) => {
        const queryOptions = api.queryOptions('get', '/alerts/{alertId}', {
          params: {
            path: { alertId }
          }
        })
        type Tmp = components['schemas']['AlertDto'] | undefined;
        const prevData = queryClient.getQueryData(queryOptions.queryKey) as Tmp;
        queryClient.setQueryData(queryOptions.queryKey, (alert: Tmp) => {
          if (!alert) return alert;
          return {
            ...alert,
            status: body.status,
          }
        })
        return {
          queryOptions,
          prevData,
        };
      },
      onError: (error, _vars, ctx) => {
        if (ctx?.prevData) {
          queryClient.setQueryData(ctx.queryOptions.queryKey, ctx.prevData)
        }
        window.alert(getErrorMessage(error))
      },
      onSettled: () => {
        void queryClient.invalidateQueries({
          predicate: invalidateQueriesPredicate(
            api.queryOptions('get', '/alerts').queryKey
          ),
        });
      }
    }
  )

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
            No results
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
        <div className="flex items-center gap-2">
          <div>Status: </div>
          <select
            value={alertQuery.data?.status ?? ''}
            onChange={(ev) => {
              const status = ev.target.value as components['schemas']['AlertDto']['status']
              updateStatusAction.mutate({
                params: {
                  path: { alertId },
                },
                body: { status },
              })
            }}
          >
            {alertQuery.data ? (
              <>
                <option value="NEW" selected={alertQuery.data?.status === 'NEW'}>NEW</option>
                <option value="ACKNOWLEDGED" selected={alertQuery.data?.status === 'ACKNOWLEDGED'}>ACKNOWLEDGED</option>
                <option value="RESOLVED" selected={alertQuery.data?.status === 'RESOLVED'}>RESOLVED</option>
              </>
            ) : (
              <option value="" disabled>Loading...</option>
            )}
          </select>
        </div>
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
