import { db } from '@repo/database';
import { projectMember } from '@repo/database/schema';
import { and, eq } from 'drizzle-orm';

export async function getProjectMember(
  projectId: string,
  userId: string
) {
  return db.query.projectMember.findFirst({
    where: and(
      eq(projectMember.projectId, projectId),
      eq(projectMember.userId, userId)
    ),
  });
}