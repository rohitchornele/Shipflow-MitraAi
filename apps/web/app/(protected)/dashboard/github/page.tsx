import { Metadata } from "next";
import { RepoList } from "~/features/github/components/repo-list";
import { GithubSettings } from "~/features/github/components/github-settings";


 export const metadata: Metadata = {
    title: "GitHub App · Dashboard",
  };

export default function GithubPage() {

  return(
    <>
   <GithubSettings />
   <RepoList />
    </>
)
}


