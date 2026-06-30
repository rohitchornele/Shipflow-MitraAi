"use client"

import { useUnauth } from '~/features/auth/hooks/use-require-unauth';
import { LoadingScreen } from '~/features/utils/components/loading-screen';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUnauth();

  if (user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden flex-1 flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
