'use client';

import { LoadingScreen } from '~/features/utils/components/loading-screen';
import { useUnauth } from '../hooks/use-require-unauth';
import { GithubSignInForm } from './github-sign-in-form';
import { useMounted } from '../hooks/use-mounted';

type LoginPageClientProps = {
  callbackUrl?: string;
};

export function LoginPageClient({ callbackUrl }: LoginPageClientProps) {
  const mounted = useMounted();
  const { user, isLoading } = useUnauth();

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return null;
  }

  return <GithubSignInForm callbackUrl={callbackUrl} />;
}
