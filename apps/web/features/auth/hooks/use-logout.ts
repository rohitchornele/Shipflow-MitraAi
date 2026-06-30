'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { authClient } from '~/lib/auth-client';

export const useLogout = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  async function logoutAsync() {
    try {
      setIsPending(true);

      setError(null);

      await authClient.signOut();

      router.replace('/login');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Logout failed'));
    } finally {
      setIsPending(false);
    }
  }

  return {
    logout: logoutAsync,

    logoutAsync,

    isPending,

    error,
  };
};
