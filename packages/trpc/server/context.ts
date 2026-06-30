import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import {
  clearCookieFactory,
  createCookieFactory,
  getCookieFactory,
} from './utils/cookie';
import { auth } from '@repo/auth';

export interface TRPCCtxUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface TRPCContext {

  headers : HeadersInit;
  createCookie: ReturnType<typeof createCookieFactory>;
  getCookie: ReturnType<typeof getCookieFactory>;
  clearCookie: ReturnType<typeof clearCookieFactory>;

  user?: TRPCCtxUser;
}

export async function createContext({
  req,
  res,
}: CreateExpressContextOptions): Promise<TRPCContext> {
  const session = await auth.api.getSession({
    headers: req.headers as HeadersInit,
  });

  const ctx: TRPCContext = {
    headers : req.headers as HeadersInit,
    createCookie: createCookieFactory(res),
    getCookie: getCookieFactory(req),
    clearCookie: clearCookieFactory(res),
    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image!,
        }
      : undefined,
  };

  return ctx;
}
export type Context = Awaited<ReturnType<typeof createContext>>;




// import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// import {
//   clearCookieFactory,
//   createCookieFactory,
//   getCookieFactory,
// } from './utils/cookie';

// import { auth } from '@repo/auth';

// export interface TRPCCtxUser {
//   id: string;
//   email: string;
//   name: string | null;
//   image: string | null;
// }

// export interface TRPCContext {
//   headers: HeadersInit;

//   createCookie: ReturnType<typeof createCookieFactory>;
//   getCookie: ReturnType<typeof getCookieFactory>;
//   clearCookie: ReturnType<typeof clearCookieFactory>;

//   user?: TRPCCtxUser;
// }

// export async function createContext({
//   req,
//   res,
// }: CreateExpressContextOptions): Promise<TRPCContext> {
//   const session = await auth.api.getSession({
//     headers: req.headers as HeadersInit,
//   });

//   return {
//     headers: req.headers as HeadersInit,

//     createCookie: createCookieFactory(res),
//     getCookie: getCookieFactory(req),
//     clearCookie: clearCookieFactory(res),

//     user: session?.user
//       ? {
//           id: session.user.id,
//           email: session.user.email,
//           name: session.user.name,
//           image: session.user.image,
//         }
//       : undefined,
//   };
// }

// export type Context = Awaited<ReturnType<typeof createContext>>;