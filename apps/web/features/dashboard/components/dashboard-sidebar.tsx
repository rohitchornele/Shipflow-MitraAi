'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Home,
  Sparkles,
  FileText,
  CheckSquare,
  Github,
  Bot,
  Rocket,
  Users,
  Settings,
} from 'lucide-react';

import { cn } from '~/lib/utils';

import { WorkspaceSwitcher } from './workspace-switcher';
import { UserCard } from './user-card';

const navigation = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: Rocket,
  },
  {
    label: 'Features',
    href: '/dashboard/features',
    icon: Sparkles,
  },
  {
    label: 'PRDs',
    href: '/dashboard/prds',
    icon: FileText,
  },
  {
    label: 'Tasks',
    href: '/dashboard/tasks',
    icon: CheckSquare,
  },
  {
    label: 'Github',
    href: '/dashboard/github',
    icon: Github,
  },
  {
    label: 'Reviews',
    href: '/dashboard/reviews',
    icon: Bot,
  },
  {
    label: 'Releases',
    href: '/dashboard/releases',
    icon: Rocket,
  },
];

const secondaryNavigation = [
  {
    label: 'Workspace',
    href: '/dashboard/workspace',
    icon: Users,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

type DashboardSidebarProps = {
  collapsed: boolean;
};

export function DashboardSidebar({ collapsed }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="
        h-screen
        border-r
        bg-background
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* Workspace Switcher */}

      <div className="p-3">
        <WorkspaceSwitcher collapsed={collapsed} />
      </div>

      {/* Main Navigation */}

      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex h-11 items-center rounded-xl transition-colors',

                    collapsed ? 'justify-center px-0' : 'px-3',

                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}

        <div className="my-4 border-t" />

        {/* Secondary Navigation */}

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex h-11 items-center rounded-xl transition-colors',

                    collapsed ? 'justify-center px-0' : 'px-3',

                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Card */}

      <div className="border-t p-3">
        <UserCard collapsed={collapsed} />
      </div>
    </aside>
  );
}
