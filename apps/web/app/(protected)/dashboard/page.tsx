'use client';

import { LoadingScreen } from '~/features/utils/components/loading-screen';
import { useCurrentUser } from '~/features/user/hook/use-current-user';
import UserCard from '~/features/user/components/user-card';

export default function DashboardPage() {
  const { user, isLoading,} = useCurrentUser();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <UserCard user={user!} />
    </div>
  );
}
