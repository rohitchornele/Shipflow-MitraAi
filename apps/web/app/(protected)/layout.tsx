'use client';

import { useRequireAuth } from '~/features/auth/hooks/use-require-auth';
import { LoadingScreen } from '~/features/utils/components/loading-screen';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
