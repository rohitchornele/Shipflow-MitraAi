import { useRouter } from 'next/navigation';

import { trpc } from '~/trpc/client';

export function useProjectSetup() {
  const router = useRouter();

  const mutation =
    trpc.projectSetup.initialize.useMutation({
      onSuccess(result) {
        router.push(`/dashboard/${result.project.id}`);
      },
    });

  return {
    initializeProject: mutation.mutateAsync,

    isPending: mutation.isPending,

    error: mutation.error,

    data: mutation.data,
  };
}