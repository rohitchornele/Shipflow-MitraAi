'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { useSession } from './use-session';

export function useRequireAuth() {
  const router = useRouter();

  const { user, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  return {
    user,
    isLoading,
    isAuthenticated: (!!user),
  };
}
