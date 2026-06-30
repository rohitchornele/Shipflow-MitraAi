'use client';

import { RepositoryStatCard } from './repository-stat-card';

type RepoOverviewProps = {
  total: number;
  publicRepos: number;
  privateRepos: number;
  syncedRepos: number;
  pendingRepos: number;
};

export function RepoOverview({
  total,
  publicRepos,
  privateRepos,
  syncedRepos,
  pendingRepos,
}: RepoOverviewProps) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Repositories
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage repositories connected to your GitHub installation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <RepositoryStatCard
          title="Repositories"
          value={total}
          description="Connected repositories"
        />

        <RepositoryStatCard
          title="Public"
          value={publicRepos}
          description="Public repositories"
        />

        <RepositoryStatCard
          title="Private"
          value={privateRepos}
          description="Private repositories"
        />

        <RepositoryStatCard
          title="Synced"
          value={syncedRepos}
          description="Successfully synced"
        />

        <RepositoryStatCard
          title="Pending"
          value={pendingRepos}
          description="Waiting for sync"
        />
      </div>
    </section>
  );
}