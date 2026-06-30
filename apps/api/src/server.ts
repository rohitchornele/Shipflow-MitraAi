import express from 'express';
import { logger } from '@repo/logger';
import cors from 'cors';

import * as trpcExpress from '@trpc/server/adapters/express';
import {
  generateOpenApiDocument,
  createOpenApiExpressMiddleware,
} from 'trpc-to-openapi';
import { apiReference } from '@scalar/express-api-reference';

import { serverRouter, createContext } from '@repo/trpc/server';

import { env } from './env';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@repo/auth';

import githubRoutes from './routes/github';

import { serve } from 'inngest/express';

import { inngest, functions } from '@repo/services/ingest';

export const app = express();
const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: 'Streamyst OpenAPI',
  version: '1.0.0',
  baseUrl: env.BASE_URL.concat('/api'),
});

// if (env.NODE_ENV !== 'prod') {
//   app.use(
//     cors({
//       origin: '*',
//     })
//   );
// }

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];

app.use(
  cors({
    origin(origin, callback) {
      // allow server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },

    credentials: true,
  })
);

// app.use(express.json());

// app.use(
//   express.json({
//     verify(req, res, buf) {
//       (req as any).rawBody = buf.toString();
//     },
//   })
// );

app.use(
  express.json({
    limit: '10mb',
    verify(req, res, buf) {
      (req as any).rawBody = buf.toString();
    },
  })
);

app.get('/', (req, res) => {
  return res.json({ message: 'Streamyst is up and running...' });
});

app.get('/health', (req, res) => {
  return res.json({ message: 'Streamyst server is healthy', healthy: true });
});

app.use('/api/github', githubRoutes);
logger.debug(`openapi.json: ${env.BASE_URL}/openapi.json`);
app.get('/openapi.json', (req, res) => {
  return res.json(openApiDocument);
});

app.use(
  '/api/auth',
  (req, res, next) => {
    console.log(req.method);
    console.log(req.originalUrl);
    next();
  },
  toNodeHandler(auth)
);

app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions,
  })
);

logger.debug(`docs: ${env.BASE_URL}/docs`);
app.use('/docs', apiReference({ url: '/openapi.json' }));

app.use(
  '/api',
  createOpenApiExpressMiddleware({ router: serverRouter, createContext })
);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: serverRouter,
    createContext,
  })
);

export default app;
