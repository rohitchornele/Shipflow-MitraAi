
'use client';

import { useState } from 'react';

import { authClient } from '~/lib/auth-client';

type UseLoginOptions = {
  callbackURL?: string;
};

type LoginStatus = 'idle' | 'loading' | 'redirecting' | 'error';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const useLogin = ({
  callbackURL = `${APP_URL}/dashboard`,
}: UseLoginOptions = {}) => {
  const [status, setStatus] = useState<LoginStatus>('idle');

  const [error, setError] = useState<Error | null>(null);

  async function loginWithGithub() {
    try {
      setError(null);

      setStatus('loading');

      await authClient.signIn.social(
        {
          provider: 'github',

          callbackURL,
        },

        {
          onRequest: () => {
            setStatus('loading');
          },

          onResponse: () => {
            // Browser will redirect

            setStatus('redirecting');
          },

          onError: (ctx) => {
            setStatus('error');

            setError(new Error(ctx.error.message));
          },
        }
      );
    } catch (err) {
      setStatus('error');

      setError(err instanceof Error ? err : new Error('Login failed'));
    }
  }

  return {
    loginWithGithub,

    status,

    error,

    isIdle: status === 'idle',

    isLoading: status === 'loading',

    isRedirecting: status === 'redirecting',

    isPending: status === 'loading' || status === 'redirecting',

    isError: status === 'error',
  };
};
