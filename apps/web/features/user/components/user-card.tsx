'use client';

import Image from 'next/image';

import { Mail, User } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { LogoutButton } from '~/features/auth/components/logout-button';

type UserCardProps = {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
  };
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="w-full max-w-md border-border/50 bg-card">
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className=''>Logged in User</CardTitle>
        <LogoutButton />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src={user?.image ?? '/avatar.png'}
            alt={user?.name ?? 'User'}
            width={72}
            height={72}
            className="rounded-full border"
          />

          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{user?.name}</h2>

            <p className="text-sm text-muted-foreground">GitHub User</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Email</p>

              <p className="text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">User ID</p>

              <p className="max-w-[280px] truncate text-sm">{user?.id}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
