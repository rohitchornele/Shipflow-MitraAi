
import { GithubSignInForm } from "~/features/auth/components/github-sign-in-form";


export default async function Home() {
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <GithubSignInForm callbackUrl="http://localhost:3000/dashboard" />
      </div>
    </main>
  );
}



