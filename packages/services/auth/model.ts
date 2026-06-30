import { z } from 'zod';

export const getCurrentUserInput = z.undefined();

export const getCurrentUserOutput = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
});

export type GetCurrentUserOutputType = z.infer<typeof getCurrentUserOutput>;

export const logoutInput = z.object({});

export const logoutOutput = z.object({success: z.boolean(),});

export type LogoutOutputType = z.infer<typeof logoutOutput>;
