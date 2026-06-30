// apps/web/components/loading-screen.tsx

'use client';

import { Card, CardContent } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Separator } from '~/components/ui/separator';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        {/* Left Sidebar */}
        <Card className="hidden h-[calc(100vh-48px)] w-72 lg:block">
          <CardContent className="space-y-6 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>

              <div>
                <div className="font-semibold">ShipFlow AI</div>

                <div className="text-xs text-muted-foreground">
                  Preparing workspace...
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-56" />

                <Skeleton className="h-4 w-80" />
              </div>

              <Skeleton className="h-12 w-12 rounded-full" />
            </CardContent>
          </Card>

          {/* Content Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="space-y-5 p-6">
                  <Skeleton className="h-5 w-40" />

                  <Skeleton className="h-4 w-full" />

                  <Skeleton className="h-4 w-3/4" />

                  <Skeleton className="h-10 w-full rounded-xl" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Big Card */}
          <Card>
            <CardContent className="space-y-5 p-6">
              <Skeleton className="h-6 w-48" />

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-[90%]" />

              <Skeleton className="h-4 w-[70%]" />

              <div className="flex items-center gap-2 pt-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />

                <span>
                  Understanding your workspace and loading projects...
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
