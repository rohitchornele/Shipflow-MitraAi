'use client';

import { authClient } from "~/lib/auth-client";


export function useSession() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  return { 
    session,
    user: session?.user,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    error,
    refetch,
    signOut: authClient.signOut,
  };
}
