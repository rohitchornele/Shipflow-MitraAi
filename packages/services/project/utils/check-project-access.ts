import { db } from '@repo/database';
import { projectMember } from '@repo/database/schema';
import { and, eq } from 'drizzle-orm';

export async function checkProjectAccess(
  projectId: string,
  userId: string
) {
  const membership =
    await db.query.projectMember.findFirst({
      where: and(
        eq(projectMember.projectId, projectId),
        eq(projectMember.userId, userId)
      ),
    });

  return !!membership;
}