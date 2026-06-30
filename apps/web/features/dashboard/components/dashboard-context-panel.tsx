'use client';

import {
  Sparkles,
  Clock3,
  Zap,
  Plus,
  PlayCircle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

import {
  Button,
} from '~/components/ui/button';

const suggestions = [
  'PRD missing Edge Cases',
  'Dark Mode ready for review',
  'Github PR #42 needs review',
];

const jobs = [
  {
    name: 'PRD Generation',
    status: 'Completed',
  },
  {
    name: 'Task Generation',
    status: 'Running',
  },
  {
    name: 'AI Review',
    status: 'Pending',
  },
];

const activity = [
  {
    title: 'PRD generated',
    time: '5 mins ago',
  },
  {
    title: 'Feature approved',
    time: '12 mins ago',
  },
  {
    title: 'PR linked',
    time: '35 mins ago',
  },
];

export function DashboardContextPanel() {
  return (
    <aside
      className="
        h-screen
        border-l
        bg-background
        overflow-y-auto
        p-4
        space-y-4
      "
    >
      {/* Header */}

      <Card>

        <CardHeader>

          <CardTitle
            className="
              flex
              items-center
              gap-2
            "
          >
            <Sparkles className="h-4 w-4" />

            AI Assistant

          </CardTitle>

        </CardHeader>

      </Card>

      {/* Suggestions */}

      <Card>

        <CardHeader>

          <CardTitle>
            Suggestions
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-3" >

          {suggestions.map(item => (

            <div
              key={item}
              className="
                flex
                items-start
                gap-2
                text-sm
              "
            >

              <Zap
                className="
                  h-4
                  w-4
                  mt-0.5
                  text-yellow-500
                "
              />

              <span>

                {item}

              </span>

            </div>

          ))}

        </CardContent>

      </Card>

      {/* Background Jobs */}

      <Card>

        <CardHeader>

          <CardTitle>
            Background Jobs
          </CardTitle>

        </CardHeader>

        <CardContent
          className="space-y-3"
        >

          {jobs.map(job => (

            <div
              key={job.name}
              className="
                flex
                justify-between
                items-center
              "
            >

              <span
                className="text-sm"
              >
                {job.name}
              </span>

              <span
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                {job.status}
              </span>

            </div>

          ))}

        </CardContent>

      </Card>

      {/* Recent Activity */}

      <Card>

        <CardHeader>

          <CardTitle>
            Recent Activity
          </CardTitle>

        </CardHeader>

        <CardContent
          className="space-y-3"
        >

          {activity.map(item => (

            <div
              key={item.title}
              className="
                flex
                items-start
                gap-3
              "
            >

              <Clock3
                className="
                  h-4
                  w-4
                  mt-0.5
                  text-muted-foreground
                "
              />

              <div>

                <p
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  {item.time}
                </p>

              </div>

            </div>

          ))}

        </CardContent>

      </Card>

      {/* Quick Actions */}

      <Card>

        <CardHeader>

          <CardTitle>
            Quick Actions
          </CardTitle>

        </CardHeader>

        <CardContent
          className="space-y-2"
        >

          <Button
            className="w-full"
          >
            <Plus className="h-4 w-4" />

            Create Feature
          </Button>

          <Button
            variant="outline"
            className="w-full"
          >
            <Sparkles className="h-4 w-4" />

            Generate PRD
          </Button>

          <Button
            variant="outline"
            className="w-full"
          >
            <PlayCircle className="h-4 w-4" />

            Trigger AI Review
          </Button>

        </CardContent>

      </Card>

    </aside>
  );
}