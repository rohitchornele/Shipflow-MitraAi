'use client';

import { Clock3 } from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
};

type ProjectRecentActivityProps = {
  activities?: Activity[];
};

export function ProjectRecentActivity({
  activities = [],
}: ProjectRecentActivityProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest activity inside this project.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center text-center">
            <Clock3 className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No activity yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Repository syncs, AI reviews, pull requests,
              and releases will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border-l-2 pl-4"
              >
                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}