import AuthService from "@repo/services/auth";
import GithubService from "@repo/services/github";
import ProjectService from "@repo/services/project";
import RepositoryManagementService from "@repo/services/repository-management"
import ProjectSetupService from "@repo/services/project-setup"
import FeatureService from "@repo/services/feature"
import AIThreadService from "@repo/services/ai-thread"
import FeatureContextService from "@repo/services/feature-context"

export const authService = new AuthService();
export const githubService = new GithubService()
export const projectService = new ProjectService()
export const repositoryManagementService = new RepositoryManagementService()
export const projectSetupService = new ProjectSetupService()
export const featureService = new FeatureService()

export const aiThreadService = new AIThreadService()
export const featureContextService = new FeatureContextService()
