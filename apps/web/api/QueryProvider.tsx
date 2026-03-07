'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { milliseconds } from 'date-fns';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import createFetchClient from "openapi-fetch";
import createClient, { OpenapiQueryClient } from 'openapi-react-query';
import type { paths } from "@pkg/api-contract/generated/openapi.d.ts"
import { useAuth } from '@/api/AuthContext';

const ApiContext = createContext<OpenapiQueryClient<paths> | null>(null);

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return ctx;
}

export function QueryProvider({ children }: PropsWithChildren) {
  const auth = useAuth();

  const headersRef = useRef(auth.headers);
  useEffect(() => {
    headersRef.current = auth.headers;
  }, [auth.headers]);

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: milliseconds({ minutes: 1 }),
        gcTime: milliseconds({ minutes: 5 }),
      }
    }
  }))

  // eslint-disable-next-line react-hooks/refs
  const [api] = useState(() => {
    const fetchClient = createFetchClient<paths>({
      // TODO NEXT_PUBLIC_ENV
      baseUrl: "http://localhost:3001/",
      fetch: (req) => {
        const request = req.clone();
        for (const [key, value] of Object.entries(headersRef.current)) {
          request.headers.set(key, value);
        }
        return fetch(request);
      }
    });
    return createClient(fetchClient);
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={api}>
        {children}
      </ApiContext.Provider>
    </QueryClientProvider>
  )
}