import { initTRPC, TRPCError } from '@trpc/server';
import { OpenApiMeta } from 'trpc-to-openapi';

import { createContext } from './context';

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authenticatedProcedure = tRPCContext.procedure.use(
  async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    return next({
      ctx: {
        ...ctx,

        user: ctx.user,
      },
    });
  }
);

// const authenticatedMiddleware = tRPCContext.middleware(
//   async ({ ctx, next }) => {
//     if (!ctx.user) {
//       throw new TRPCError({
//         code: 'UNAUTHORIZED',
//       });
//     }

//     return next({
//       ctx: {
//         ...ctx,
//         user: ctx.user,
//       },
//     });
//   }
// );

// export const authenticatedProcedure = publicProcedure.use(
//   authenticatedMiddleware
// );
