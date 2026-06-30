'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { DashboardNavbar } from '~/features/dashboard/components/dashboard-navbar';
import { DashboardSidebar } from '~/features/dashboard/components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* ---------------- Desktop Sidebar ---------------- */}
      <aside
        className={`hidden shrink-0 border-r bg-background transition-all duration-300 lg:block ${
          collapsed ? 'w-[72px]' : 'w-[280px]'
        }`}
      >
        <DashboardSidebar collapsed={collapsed} />
      </aside>

      {/* ---------------- Mobile Sidebar ---------------- */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="fixed left-0 top-0 z-50 h-screen w-[280px] border-r bg-background shadow-xl lg:hidden">
            <DashboardSidebar collapsed={false} />
          </aside>
        </>
      )}

      {/* ---------------- Content ---------------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 border-b bg-background">
          <DashboardNavbar />

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-4 top-4 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop Collapse Button */}
          <Button
            size="icon"
            variant="outline"
            className="absolute -left-4 top-5 hidden h-8 w-8 rounded-full bg-background shadow-md lg:flex z-999 border-2 border-white"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
