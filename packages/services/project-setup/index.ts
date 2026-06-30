import { githubService } from '../github';
import { projectService } from '../project';
import { repositoryManagementService } from '../repository-management';
import { triggerRepositorySync } from '../repository-sync';

import type { SetupProjectInput, SetupProjectOutput } from './model';

class ProjectSetupService {
  async initialize(
    ownerId: string,
    input: SetupProjectInput
  ): Promise<SetupProjectOutput> {

    const installationId = await githubService.getUserInstallationId(ownerId);

    if (!installationId) {
      throw new Error(
        'GitHub is not connected. Please connect GitHub before creating a project.'
      );
    }


    const project = await projectService.create(ownerId, {
      name: input.name,
      description: input.description,
    });


    const repositories = await repositoryManagementService.attachMany(
      input.repositories.map((repository) => ({
        projectId: project.id,

        githubRepositoryId: repository.githubRepositoryId,

        githubInstallationId: String(installationId),

        owner: repository.owner,

        name: repository.name,

        fullName: repository.fullName,

        defaultBranch: repository.defaultBranch,

        isPrivate: repository.isPrivate,

        isArchived: repository.isArchived,
      }))
    );


    await Promise.all(
      repositories.map((repository) =>
        triggerRepositorySync({
          installationId,

          repositoryId: Number(repository.githubRepositoryId),

          repositoryOwner: repository.owner,

          repositoryName: repository.name,

          defaultBranch: repository.defaultBranch,
        })
      )
    );


    return {
      project,
      repositoryIds: repositories.map((repository) => repository.id),
    };
  }
}

export default ProjectSetupService;

const projectSetupService = new ProjectSetupService();

export { projectSetupService };
