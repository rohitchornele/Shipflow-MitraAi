import { authenticatedProcedure, router } from '../../trpc';

import { authService } from '../../services';

import {
  getCurrentUserInput,
  getCurrentUserOutput,
  logoutInput,
  logoutOutput,
} from '@repo/services/auth/model';
import { generatePath } from '../../utils/path-generator';

const TAGS = ['Auth'];

const getPath = generatePath("/auth");

export const authRouter = router({
  getCurrentUser: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/get-session'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getCurrentUserInput)
    .output(getCurrentUserOutput)
    .query(({ ctx }) => {
      return authService.getCurrentUser(ctx.user);
    }),

  logout: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/logout'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(logoutInput)
    .output(logoutOutput)
    .mutation(async ({ ctx }) => {
      return authService.logout(ctx.headers);
    }),
});