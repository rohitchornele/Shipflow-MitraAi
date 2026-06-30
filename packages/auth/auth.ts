import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@repo/database'; // your drizzle instance
import * as authSchema from '@repo/database/models/auth-schema'; // your drizzle instance
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: ['http://localhost:3000'],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: async(profile) => ({
        email: profile.email ?? `${profile.id}@user.noreply.github.com`,
        name: profile.name ?? profile.login,
      })
    },
  },
  plugins: [nextCookies()]
});
