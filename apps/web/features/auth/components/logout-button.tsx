'use client';

import { LogOut, Loader2 } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { useLogout } from '~/features/auth/hooks/use-logout';

export function LogoutButton() {
  const {
    logout,

    isPending,
  } = useLogout();

  return (
    <Button variant="outline" disabled={isPending} onClick={() => logout()}>
      {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
      Logout
    </Button>
  );
}
