import { eq, and } from 'drizzle-orm';

import { db } from '@repo/database';
import { feature } from '@repo/database/schema';

import type {
  CreateFeatureInput,
  UpdateFeatureInput,
} from './model';

class FeatureService {
  async create(
    userId: string,
    input: CreateFeatureInput
  ) {
    const [features] = await db
      .insert(feature)
      .values({
        projectId: input.projectId,

        repositoryId: input.repositoryId,

        createdBy: userId,

        title: input.title,

        description: input.description,
      })
      .returning();

    return features!;
  }

  async list(projectId: string) {
    return db.query.feature.findMany({
      where: eq(
        feature.projectId,
        projectId
      ),

      orderBy(fields, operators) {
        return [
          operators.desc(
            fields.updatedAt
          ),
        ];
      },
    });
  }

  async get(featureId: string) {
    return db.query.feature.findFirst({
      where: eq(feature.id, featureId),
    });
  }

  async update(
    featureId: string,
    input: UpdateFeatureInput
  ) {
    const [features] = await db
      .update(feature)
      .set({
        title: input.title,

        description: input.description,

        repositoryId: input.repositoryId,

        status: input.status,

        priority: input.priority,
      })
      .where(eq(feature.id, featureId))
      .returning();

    return features!;
  }

  async delete(featureId: string) {
    await db
      .delete(feature)
      .where(eq(feature.id, featureId));

    return {
      success: true,
    };
  }
}

export default FeatureService;