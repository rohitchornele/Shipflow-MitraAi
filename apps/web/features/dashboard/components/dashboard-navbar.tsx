'use client';

import { Bell, Plus, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ModeToggle } from '~/components/ui/mode-toggle';

function getPageTitle(pathname: string) {
  if (pathname === '/dashboard') return 'Overview';
  if (pathname.startsWith('/dashboard/features')) return 'Features';
  if (pathname.startsWith('/dashboard/prds')) return 'PRDs';
  if (pathname.startsWith('/dashboard/tasks')) return 'Tasks';
  if (pathname.startsWith('/dashboard/github')) return 'GitHub';
  if (pathname.startsWith('/dashboard/repos')) return 'Repositories';
  if (pathname.startsWith('/dashboard/reviews')) return 'Reviews';
  if (pathname.startsWith('/dashboard/releases')) return 'Releases';
  if (pathname.startsWith('/dashboard/settings')) return 'Settings';

  return 'Dashboard';
}

export function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold">
          {getPageTitle(pathname)}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="w-72 pl-9"
          />
        </div>

        {/* Theme */}
        <ModeToggle />

        {/* Notifications */}
        <Button
          size="icon"
          variant="outline"
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* Primary Action */}
        <Button className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Feature
        </Button>
      </div>
    </header>
  );
}