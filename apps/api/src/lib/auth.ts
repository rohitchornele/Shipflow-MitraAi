// import { betterAuth } from 'better-auth';
// import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// import { db } from '@repo/database'; // your drizzle instance
// import { authSchema } from '@repo/database/schema'; // your drizzle instance

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: 'pg',
//     schema: authSchema,
//   }),
//   secret: process.env.BETTER_AUTH_SECRET,

//   baseURL: process.env.BETTER_AUTH_URL,

//   trustedOrigins: ['http://localhost:3000'],

//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     github: {
//       clientId: process.env.GITHUB_OAUTH_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string,
//     },
//   },
// });
