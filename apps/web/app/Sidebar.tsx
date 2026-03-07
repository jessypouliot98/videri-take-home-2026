'use client'
import { useAuth } from '@/api/AuthContext';
import { useApi } from '@/api/QueryProvider';
import { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

export function Sidebar() {
  const auth = useAuth();
  const api = useApi();
  const queryClient = useQueryClient();
  const unsafeUserQuery = api.useQuery(
    'get',
    '/users'
  )

  let content: ReactNode;
  if (unsafeUserQuery.isError) {
    content = (
      <div>Error</div>
    )
  } else if (unsafeUserQuery.isLoading) {
    content = (
      <div>Loading...</div>
    )
  } else {
    content = (
      <ul role="listbox">
        {unsafeUserQuery.data!.map((user) => (
          <li
            key={user.id}
            role="radio"
            aria-checked={auth.user?.userId === user.id}
            className="group flex"
          >
            <button
              className={clsx(
                "flex flex-col items-start flex-1 p-2 cursor-pointer",
                "bg-white hover:bg-blue-100",
                "group-aria-checked:bg-blue-500 hover:group-aria-checked:bg-blue-500 group-aria-checked:text-white"
              )}
              onClick={() => {
                auth.login({
                  userId: user.id,
                  orgId: user.organization.id,
                })
                // Hack to fix delayed by 1 render auth change
                setTimeout(() => {
                  void queryClient.invalidateQueries();
                }, 0)
              }}
            >
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-sm italic">{user.email}</div>
              <div className="text-xs">{`@${user.organization.name}`}</div>
            </button>
          </li>
        ))}
        <li
          role="radio"
          aria-checked={!auth.isAuthenticated}
          className="group flex"
        >
          <button
            className={clsx(
              "flex flex-col items-start flex-1 p-2 cursor-pointer",
              "bg-white hover:bg-blue-100",
              "group-aria-checked:bg-blue-500 hover:group-aria-checked:bg-blue-500 group-aria-checked:text-white"
            )}
            onClick={() => {
              auth.logout()
              queryClient.clear();
            }}
          >
            <div className="text-xl font-semibold">
              No user
            </div>
          </button>
        </li>
      </ul>
    )
  }

  return (
    <aside className="w-64 overflow-y-auto border-r border-neutral-200">
      <div className="p-2">
        <h1 className="text-3xl font-bold">API Demo</h1>
      </div>
      <div>
        <div className="p-2">
          <h2 className="text-lg font-medium">Pick a user</h2>
        </div>
        {content}
      </div>
    </aside>
  )
}