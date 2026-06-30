import { router } from './trpc';

import { healthRouter } from './routes/health/route';
import { authRouter } from './routes/auth/route';
import { githubRouter } from './routes/github/route';
import { projectRouter } from './routes/project/route';
import { repositoryRouter } from './routes/repository/route';
import { projectSetupRouter } from './routes/project-setup/route';
import { featureRouter } from './routes/feature/route';
import { aiThreadRouter } from './routes/ai-thread/route';
import { featureContextRouter } from './routes/feature-context/route';

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  github: githubRouter,
  project: projectRouter,
  repository: repositoryRouter,
  projectSetup: projectSetupRouter,
  feature: featureRouter,
  aiThread: aiThreadRouter,
  featureContext: featureContextRouter,
});

export { createContext } from './context';
export type ServerRouter = typeof serverRouter;
