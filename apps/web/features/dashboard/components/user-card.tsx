'use client';

import { LogOut, Settings } from 'lucide-react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

import { Button } from '~/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useLogout } from '~/features/auth/hooks/use-logout';
import { useSession } from '~/features/auth/hooks/use-session';

type UserCardProps = {
  collapsed?: boolean;
};

export function UserCard({ collapsed = false }: UserCardProps) {
  const { user } = useSession();

  const {
    logout,

    isPending,
  } = useLogout();

  const initials =
    user?.name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U';

  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger asChild> */}
      <DropdownMenuTrigger className="flex w-full items-center justify-start rounded-2xl p-2 hover:bg-accent"
      >
        {/* <Button
          variant="ghost"
          className={`  w-full
            h-auto
            p-2

            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
        > */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? ''} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="ml-3 text-left overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>

              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
        {/* </Button> */}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {/* <div className="px-2 py-2">
          <p className="text-sm font-medium">{user?.name}</p>

          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div> */}

        {/* <DropdownMenuSeparator /> */}

        {/* <DropdownMenuItem asChild> */}
        <DropdownMenuItem>
          <Link href="/dashboard/settings" className="flex gap-2 p-1">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={isPending} onClick={logout}>
          <div className="flex gap-2 p-1">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
