import { db } from '@repo/database';
import { project } from '@repo/database/schema';
import { eq } from 'drizzle-orm';

import type { CreateProjectInput, UpdateProjectInput } from './model';
import { createOwnerMembership } from './utils/create-owner-membership';

class ProjectService {
  /* -------------------------------------------------------------------------- */
  /*                              Create Project                                */
  /* -------------------------------------------------------------------------- */

  public async create(ownerId: string, input: CreateProjectInput) {
    const [createdProject] = await db
      .insert(project)
      .values({
        ownerId,
        name: input.name,
        description: input.description ?? null,
      })
      .returning();

    if (!createdProject) {
      throw new Error('Failed to create project.');
    }

    return createdProject;
  }

  /* -------------------------------------------------------------------------- */
  /*                               List Projects                                */
  /* -------------------------------------------------------------------------- */

  public async list(ownerId: string) {
    return db.query.project.findMany({
      where: eq(project.ownerId, ownerId),
      orderBy: (project, { desc }) => [desc(project.createdAt)],
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                Get Project                                 */
  /* -------------------------------------------------------------------------- */

  public async get(projectId: string) {
    const existingProject = await db.query.project.findFirst({
      where: eq(project.id, projectId),
    });

    if (!existingProject) {
      throw new Error('Project not found.');
    }

    return existingProject;
  }

  /* -------------------------------------------------------------------------- */
  /*                              Update Project                                */
  /* -------------------------------------------------------------------------- */

  public async update(input: UpdateProjectInput) {
    const [updatedProject] = await db
      .update(project)
      .set({
        name: input.name,
        description: input.description,
        updatedAt: new Date(),
      })
      .where(eq(project.id, input.projectId))
      .returning();

    if (!updatedProject) {
      throw new Error('Project not found.');
    }

    return updatedProject;
  }

  /* -------------------------------------------------------------------------- */
  /*                              Delete Project                                */
  /* -------------------------------------------------------------------------- */

  public async delete(projectId: string) {
    await db.delete(project).where(eq(project.id, projectId));

    return {
      success: true,
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                              Project Exists                                */
  /* -------------------------------------------------------------------------- */

  public async exists(projectId: string) {
    const existingProject = await db.query.project.findFirst({
      where: eq(project.id, projectId),
    });

    return !!existingProject;
  }

  /* -------------------------------------------------------------------------- */
  /*                             Get Owned Project                              */
  /* -------------------------------------------------------------------------- */

  public async getOwnedProject(ownerId: string, projectId: string) {
    const existingProject = await db.query.project.findFirst({
      where: (project, { and, eq }) =>
        and(eq(project.id, projectId), eq(project.ownerId, ownerId)),
    });

    if (!existingProject) {
      throw new Error('Project not found.');
    }

    return existingProject;
  }
}

export default ProjectService;

const projectService = new ProjectService();

export { projectService };
