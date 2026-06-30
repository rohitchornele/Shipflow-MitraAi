import { db } from "@repo/database";
import { githubPullRequest } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { REVIEW_MODEL } from "../ai/models";


export async function markPullRequestReviewed(
  id: string,
  reviewComment: string
) {
  await db
    .update(githubPullRequest)
    .set({
      status: "reviewed",
      reviewComment,
      reviewModel: REVIEW_MODEL,
      reviewedAt: new Date(),
    })
    .where(eq(githubPullRequest.id, id));
}