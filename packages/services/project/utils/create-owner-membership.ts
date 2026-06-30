import { db } from '@repo/database';
import { projectMember } from '@repo/database/schema';

export async function createOwnerMembership(
  projectId: string,
  ownerId: string
) {
  await db.insert(projectMember).values({
    projectId,
    userId: ownerId,
    role: 'owner',
  });
}