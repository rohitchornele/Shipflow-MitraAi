'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

import { RepoTableRow } from './repo-table-row';

type Props = {
  repositories: any[];
};

export function RepoTable({
  repositories,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>Repository</TableHead>

            <TableHead>Language</TableHead>

            <TableHead>Visibility</TableHead>

            <TableHead>Branch</TableHead>

            <TableHead className="text-right">
              Stars
            </TableHead>

            <TableHead className="text-right">
              Updated
            </TableHead>

            <TableHead className="text-center">
              Status
            </TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {repositories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-12 text-center text-muted-foreground"
              >
                No repositories found.
              </TableCell>
            </TableRow>
          ) : (
            repositories.map((repo) => (
              <RepoTableRow
                key={repo.id}
                repo={repo}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}