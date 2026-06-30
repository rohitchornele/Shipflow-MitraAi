// 'use client';

// import { useMemo, useState } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { Search } from 'lucide-react';

// import { useRepositories } from '~/features/github/hooks/use-repositories';

// import { Input } from '~/components/ui/input';
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
// } from '~/components/ui/tabs';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '~/components/ui/table';

// type Filter = 'all' | 'public' | 'private';

// export function RepoList() {
//   const {
//     repositories,
//     isPending,
//     isError,
//   } = useRepositories();

//   const [filter, setFilter] =
//     useState<Filter>('all');

//   const [search, setSearch] =
//     useState('');

//   const counts = useMemo(() => {
//     return {
//       all: repositories.length,
//       public: repositories.filter(
//         (repo) => repo.visibility === 'public'
//       ).length,
//       private: repositories.filter(
//         (repo) => repo.visibility === 'private'
//       ).length,
//     };
//   }, [repositories]);

//   const visibleRepositories = useMemo(() => {
//     const query = search.toLowerCase();

//     return repositories.filter((repo) => {
//       if (
//         filter !== 'all' &&
//         repo.visibility !== filter
//       ) {
//         return false;
//       }

//       if (
//         query &&
//         !repo.fullName
//           .toLowerCase()
//           .includes(query)
//       ) {
//         return false;
//       }

//       return true;
//     });
//   }, [repositories, filter, search]);

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
//         Loading repositories...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center py-12 text-sm text-destructive">
//         Failed to load repositories.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5">

//       {/* Filters */}

//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//         <Tabs
//           value={filter}
//           onValueChange={(value) =>
//             setFilter(value as Filter)
//           }
//         >
//           <TabsList>
//             <TabsTrigger value="all">
//               All ({counts.all})
//             </TabsTrigger>

//             <TabsTrigger value="public">
//               Public ({counts.public})
//             </TabsTrigger>

//             <TabsTrigger value="private">
//               Private ({counts.private})
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <div className="relative w-full lg:w-80">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//           <Input
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             placeholder="Search repositories..."
//             className="pl-9"
//           />
//         </div>
//       </div>

//       {/* Table */}

//       <div className="rounded-lg border">
//         <div className="overflow-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Repository</TableHead>
//                 <TableHead>Visibility</TableHead>
//                 <TableHead>Branch</TableHead>
//                 <TableHead>Language</TableHead>
//                 <TableHead className="text-right">
//                   Stars
//                 </TableHead>
//                 <TableHead className="text-right">
//                   Updated
//                 </TableHead>
//                 <TableHead className="text-right">
//                   Status
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {visibleRepositories.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={7}
//                     className="text-center text-muted-foreground"
//                   >
//                     No repositories found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 visibleRepositories.map((repo) => (
//                   <TableRow key={repo.id}>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <span className="font-medium">
//                           {repo.name}
//                         </span>

//                         <span className="text-xs text-muted-foreground">
//                           {repo.fullName}
//                         </span>
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       {repo.visibility}
//                     </TableCell>

//                     <TableCell>
//                       {repo.defaultBranch}
//                     </TableCell>

//                     <TableCell>
//                       {repo.language ?? '—'}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       {repo.stars}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       {formatDistanceToNow(
//                         new Date(repo.updatedAt),
//                         {
//                           addSuffix: true,
//                         }
//                       )}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       {repo.syncStatus ??
//                         'Not Synced'}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useRepositories } from '~/features/github/hooks/use-repositories';

import { RepoOverview } from './repo-overview';
import {
  RepoFilters,
  type RepositoryFilter,
} from './repo-filters';
import {
  RepoSort,
  type RepositorySort,
} from './repo-sort';
import { RepoSearch } from './repo-search';
import { RepoTable } from './repo-table';

export function RepoList() {
  const {
    repositories,
    // totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useRepositories();

  const [filter, setFilter] =
    useState<RepositoryFilter>('all');

  const [search, setSearch] = useState('');

  const [sort, setSort] =
    useState<RepositorySort>('default');

  const loadMoreRef =
    useRef<HTMLDivElement>(null);

  /**
   * Overview stats
   */
  const repositoryStats = useMemo(() => {
    const synced = repositories.filter(
      (repo) => repo.syncStatus === 'synced'
    ).length;

    return {
      total: repositories.length,

      publicRepos: repositories.filter(
        (repo) => repo.visibility === 'public'
      ).length,

      privateRepos: repositories.filter(
        (repo) => repo.visibility === 'private'
      ).length,

      syncedRepos: synced,

      pendingRepos: repositories.length - synced,
    };
  }, [repositories]);

  /**
   * Filter counts
   */
  const counts = useMemo(() => {
    return {
      all: repositories.length,

      public: repositories.filter(
        (repo) => repo.visibility === 'public'
      ).length,

      private: repositories.filter(
        (repo) => repo.visibility === 'private'
      ).length,
    };
  }, [repositories]);

  /**
   * Filter + Search + Sort
   */
  const visibleRepositories = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = repositories.filter((repo) => {
      if (
        filter !== 'all' &&
        repo.visibility !== filter
      ) {
        return false;
      }

      if (
        query &&
        !repo.name
          .toLowerCase()
          .includes(query) &&
        !repo.fullName
          .toLowerCase()
          .includes(query)
      ) {
        return false;
      }

      return true;
    });

    switch (sort) {
      case 'name-asc':
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case 'name-desc':
        return [...filtered].sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      case 'stars-desc':
        return [...filtered].sort(
          (a, b) => b.stars - a.stars
        );

      case 'stars-asc':
        return [...filtered].sort(
          (a, b) => a.stars - b.stars
        );

      default:
        return filtered;
    }
  }, [
    repositories,
    filter,
    search,
    sort,
  ]);

  /**
   * Infinite Scroll
   */
  useEffect(() => {
    const element = loadMoreRef.current;

    if (
      !element ||
      !hasNextPage ||
      isFetchingNextPage
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            fetchNextPage();
          }
        },
        {
          rootMargin: '200px',
        }
      );

    observer.observe(element);

    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  if (
    isPending &&
    repositories.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        Loading repositories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-destructive">
        Failed to load repositories.
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">

      <RepoOverview
        total={repositoryStats.total}
        publicRepos={repositoryStats.publicRepos}
        privateRepos={repositoryStats.privateRepos}
        syncedRepos={repositoryStats.syncedRepos}
        pendingRepos={repositoryStats.pendingRepos}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <RepoFilters
          value={filter}
          counts={counts}
          onChange={setFilter}
        />

        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">

          <RepoSearch
            value={search}
            onChange={setSearch}
          />

          <RepoSort
            value={sort}
            onChange={setSort}
          />

        </div>
      </div>

      <div className="rounded-lg border">

        <RepoTable
          repositories={visibleRepositories}
        />

        <div
          ref={loadMoreRef}
          className="border-t py-4 text-center text-sm text-muted-foreground"
        >
          {/* {isFetchingNextPage
            ? 'Loading more repositories...'
            : hasNextPage
              ? `Showing ${repositories.length} of ${totalCount} repositories`
              : `All ${repositories.length} repositories loaded`} */}
        </div>

      </div>

    </div>
  );
}