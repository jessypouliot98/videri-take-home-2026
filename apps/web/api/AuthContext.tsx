'use client'

import { createContext, useState, PropsWithChildren, useMemo, useCallback, useContext } from 'react';

type State = { userId: string; orgId: string };

type ContextType =
  & {
    headers: Record<string, string>;
    login: (params: { userId: string; orgId: string }) => void;
    logout: () => void;
  }
  & (
    | { isAuthenticated: true; user: State }
    | { isAuthenticated: false; user: undefined }
  );

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<State | undefined>({
    userId: 'e7d2c8ab-0be4-4ba9-9ecb-a39137ba20d0',
    orgId: '2d3afcc0-93a5-49a1-a7b9-b14ffd471547'
  });
  const headers = useMemo((): Record<string, string> => {
    if (!state) {
      return {};
    }
    return {
      'X-User-Id': state.userId,
      'X-Org-Id': state.orgId,
    }
  }, [state]);
  const logout = useCallback<ContextType['logout']>(() => {
    setState(undefined);
  }, [])
  return (
    <AuthContext.Provider value={{
      headers,
      login: setState,
      logout,
      isAuthenticated: !!state,
      user: state,
    } as ContextType}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}