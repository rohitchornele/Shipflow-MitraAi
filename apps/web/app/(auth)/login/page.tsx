// import { Metadata } from 'next';
// import React from 'react';
// import { Card, CardContent } from '~/components/ui/card';

// import Image from 'next/image';
// import { GithubSignInForm } from '~/features/auth/components/github-sign-in-form';
// import { LoginPageClient } from '~/features/auth/components/login-page-client';

// export const metadata: Metadata = {
//   title: 'Sign in',
//   description: 'Sign in to ShipFlow AI Code Reviewer with your Github account.',
// };

// type SignInPageProps = {
//   searchParams: Promise<{ callbackUrl?: string }>;
// };

// const SignInPage = async ({ searchParams }: SignInPageProps) => {
//   const { callbackUrl } = await searchParams;

//   return (
//     <main className="h-screen flex items-center justify-center p-6 overflow-hidden">
//       <LoginPageClient callbackUrl={callbackUrl} />
//       <Card className="w-full max-w-md border-border/80 bg-card/10 backdrop-blur-xl">
//         <CardContent className="p-8">
//           <div className="text-center space-y-3 mb-8">
//             <div className="flex justify-center">
//               <div className="h-full rounded-2xl border border-border flex items-center justify-center text-xl font-bold">
//                 <Image
//                   src="/logo-short.png"
//                   alt="Logo"
//                   width={120}
//                   height={120}
//                   priority
//                   className="text-foreground"
//                 />
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight">Shipflow</h1>

//             <p className="text-muted-foreground text-sm">
//               AI Product → Engineering Workflow
//             </p>
//           </div>

//           <div className="space-y-4">
//             <GithubSignInForm callbackUrl={callbackUrl} />
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// };

// export default SignInPage;

import { Suspense } from 'react';

import Image from 'next/image';

import { Card, CardContent } from '~/components/ui/card';

import { LoginPageClient } from '~/features/auth/components/login-page-client';
import { LoadingScreen } from '~/features/utils/components/loading-screen';

type Props = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

async function LoginContent({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <Card className="w-full max-w-md border-border/80 bg-card/10 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="mb-8 space-y-3 text-center">
            <div className="flex justify-center">
              <Image
                src="/logo-short.png"
                alt="Logo"
                width={120}
                height={120}
                priority
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">ShipFlow</h1>

            <p className="text-sm text-muted-foreground">
              AI Product → Engineering Workflow
            </p>
          </div>

          <LoginPageClient callbackUrl={params.callbackUrl} />
        </CardContent>
      </Card>
    </main>
  );
}

export default function SignInPage(props: Props) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginContent {...props} />
    </Suspense>
  );
}
