'use client';

import { Github, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { Alert, AlertDescription } from '~/components/ui/alert';

import { useLogin } from '~/features/auth/hooks/use-login';

type GithubSignInFormProps = {
  callbackUrl?: string;
};

export function GithubSignInForm({ callbackUrl }: GithubSignInFormProps) {
  const {
    loginWithGithub,

    error,

    isLoading,

    isRedirecting,

    isPending,

    isError,
  } = useLogin({
    callbackURL: callbackUrl,
  });

  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        size="lg"
        disabled={isPending}
        onClick={loginWithGithub}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Github />}

        {isLoading
          ? 'Connecting to Github...'
          : isRedirecting
            ? 'Redirecting to Github...'
            : 'Continue with Github'}
      </Button>

      {isError && (
        <Alert variant="destructive">
          <AlertCircle />

          <AlertDescription>
            {error?.message ?? 'Failed to login'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
