'use client'

import { createContext, useState, PropsWithChildren, useMemo, useCallback, useContext, useEffect } from 'react';

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
  const [state, setState] = useState<State | undefined>(() => {
    const userId = localStorage.getItem('userId');
    const orgId = localStorage.getItem('orgId');
    if (userId && orgId) {
      return { userId, orgId };
    }
    return undefined;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem('userId', state.userId);
      localStorage.setItem('orgId', state.orgId);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('orgId');
    }
  }, [state])

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