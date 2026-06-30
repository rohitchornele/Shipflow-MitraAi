'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  ShieldCheck,
} from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

import { useGithubInstallation } from '../hooks/use-github-installation';
import { useGithubInstallUrl } from '../hooks/use-github-install-url';

type GithubConnectionCardProps = {
  compact?: boolean;
};

export function GithubConnectionCard({
  compact = false,
}: GithubConnectionCardProps) {
  const { installation, isLoading } =
    useGithubInstallation();

  const { installUrl } = useGithubInstallUrl();

  if (isLoading) {
    return (
      <Card className="border-border/60">
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            Checking GitHub connection...
          </p>
        </div>
      </Card>
    );
  }

  const connected = installation?.connected;

  return (
    <Card className="border-border/60">
      <div className="flex items-start justify-between gap-6 p-6">
        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
              connected
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-border bg-muted'
            }`}
          >
            <Github className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                GitHub
              </h3>

              {connected ? (
                <Badge
                  className="
                    border-green-500/30
                    bg-green-500/10
                    text-green-600
                  "
                >
                  Connected
                </Badge>
              ) : (
                <Badge variant="secondary">
                  Not Connected
                </Badge>
              )}
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {connected
                ? `Connected as @${installation?.accountLogin}`
                : 'Connect your GitHub account to import repositories.'}
            </p>

            {!compact && connected && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                <ShieldCheck className="h-4 w-4" />

                Repository access enabled
              </div>
            )}
          </div>
        </div>

        {!connected && installUrl && (
          <Button>
            <a
              href={installUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect GitHub

              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}

        {connected && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />

            <span className="text-sm font-medium">
              Ready
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}