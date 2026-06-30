'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  PlugZap,
  ShieldCheck,
} from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';

import { useGithubInstallation } from '../hooks/use-github-installation';
import { useDisconnectGithub } from '../hooks/use-disconnect-github';
import { useGithubInstallUrl } from '../hooks/use-github-install-url';
import { useState } from 'react';

export function GithubSettings() {
  const { installation, isLoading, refetch } = useGithubInstallation();

  const [waitingForWebhook, setWaitingForWebhook] = useState(false);

  const { disconnectAsync, isPending } = useDisconnectGithub();
  const { installUrl } = useGithubInstallUrl();

  const handleDisconnect = async () => {
    setWaitingForWebhook(true);

    await disconnectAsync();

    const interval = setInterval(async () => {
      const result = await refetch();

      if (!result.data?.connected) {
        clearInterval(interval);
        setWaitingForWebhook(false);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setWaitingForWebhook(false);
    }, 15000);
  };

  if (isLoading) {
    return (
      <Card className="max-w-3xl">
        <CardContent className="p-6">Loading GitHub integration...</CardContent>
      </Card>
    );
  }

  const connected = installation?.connected;

  return (
    <Card className="max-w-3xl border-border/80">
      <CardContent className="p-0">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div
              className={`
                flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border
                ${
                  connected
                    ? 'border-green-500/30 bg-green-500/10'
                    : 'border-border bg-muted'
                }
              `}
            >
              <Github className="h-6 w-6" />
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">GitHub Integration</h3>

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
                    <Badge variant="secondary">Not Connected</Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Connect GitHub repositories to ShipFlow for AI code reviews,
                  repository insights, pull request analysis, and engineering
                  workflow tracking.
                </p>
              </div>

              {connected ? (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>
                      Connected as{' '}
                      <strong>@{installation?.accountLogin}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Repository access and webhook delivery active</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Connect public and private repositories</div>

                  <div>• Sync pull requests and commits</div>

                  <div>• Generate AI-powered code reviews</div>

                  <div>• Track engineering delivery progress</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0">
            {connected ? (
              <Button
                variant="destructive"
                disabled={isPending || waitingForWebhook}
                onClick={handleDisconnect}
              >
                {waitingForWebhook ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            ) : (
              <Button>
                <a href={installUrl}>Install GitHub App</a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
