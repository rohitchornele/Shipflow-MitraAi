import { eq, sql } from 'drizzle-orm';

import { db } from '@repo/database';
import { featureContext } from '@repo/database/schema';

import type { CreateFeatureContextInput, RequirementContext } from './model';

class FeatureContextService {
  /* -------------------------------------------------------------------------- */
  /*                                   Create                                   */
  /* -------------------------------------------------------------------------- */

  async create(input: CreateFeatureContextInput) {
    const existing = await db.query.featureContext.findFirst({
      where: eq(featureContext.featureId, input.featureId),
    });

    if (existing) {
      return existing;
    }

    const result = await db
      .insert(featureContext)
      .values({
        featureId: input.featureId,
      })
      .returning();

    const context = result[0];

    if (!context) {
      throw new Error('Failed to create feature context');
    }

    return context;
  }

  /* -------------------------------------------------------------------------- */
  /*                                     Get                                    */
  /* -------------------------------------------------------------------------- */

  async get(featureId: string) {
    const existing = await db.query.featureContext.findFirst({
      where: eq(featureContext.featureId, featureId),
    });

    if (existing) {
      return existing;
    }

    return this.create({
      featureId,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                              Update From AI                                */
  /* -------------------------------------------------------------------------- */

  async updateFromAI(featureId: string, context: RequirementContext) {
    const result = await db
      .update(featureContext)
      .set({
        summary: context.summary,
        requirements: context.requirements,
        missingItems: context.missingItems,
        completion: context.completion,
        version: sql`${featureContext.version} + 1`,
      })
      .where(eq(featureContext.featureId, featureId))
      .returning();

    const updated = result[0];

    if (!updated) {
      throw new Error('Failed to update feature context');
    }

    return updated;
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Reset                                   */
  /* -------------------------------------------------------------------------- */

  async reset(featureId: string) {
    const result = await db
      .update(featureContext)
      .set({
        summary: null,
        requirements: null,
        missingItems: null,
        completion: 0,
        version: 1,
      })
      .where(eq(featureContext.featureId, featureId))
      .returning();

    const updated = result[0];

    if (!updated) {
      throw new Error('Failed to reset feature context');
    }

    return updated;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Delete                                   */
  /* -------------------------------------------------------------------------- */

  async delete(featureId: string) {
    await db
      .delete(featureContext)
      .where(eq(featureContext.featureId, featureId));

    return {
      success: true,
    };
  }
}

export default FeatureContextService;

const featureContextService = new FeatureContextService();

export { featureContextService };
