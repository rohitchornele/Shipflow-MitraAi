

import { inngest } from "../ingest";
import { saveRepositorySync } from "./save-repository-sync";

type TriggerRepositorySyncInput = {
  installationId: number;
  repositoryId: number;
  repositoryOwner: string;
  repositoryName: string;
  defaultBranch: string;
};

export async function triggerRepositorySync(
  input: TriggerRepositorySyncInput
) {
  const repositorySync = await saveRepositorySync(input);

  await inngest.send({
    name: "github/repository.sync.requested",
    data: {
      repositorySyncId: repositorySync.id,
    },
  });

  return repositorySync;
}