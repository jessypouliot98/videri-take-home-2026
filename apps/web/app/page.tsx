'use client'

import { useApi } from '@/api/QueryProvider';
import { ReactNode } from 'react';

export default function Home() {
  const api = useApi();
  const q = api.useQuery('get', '/alerts', {
    params: {
      query: { status: 'NEW' }
    }
  });
  let content: ReactNode;
  if (q.isError) {
    content = (
      <div>Error</div>
    )
  } else if (q.isLoading) {
    content = (
      <div>Loading...</div>
    )
  } else {
    content = (
      <ol>
        {q.data?.items.map((item) => (
          <li key={item.id}>
            {item}
          </li>
        ))}
      </ol>
    )
  }
  return (
    <div>
      {content}
    </div>
  );
}
