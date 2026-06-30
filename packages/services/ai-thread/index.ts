import { eq } from 'drizzle-orm';

import { db } from '@repo/database';
import { aiMessages, aiThreads } from '@repo/database/schema';

import type {
  AIMessageRole,
  CreateThreadInput,
  SendMessageInput,
} from './model';
import { processRequirementConversation } from '../ai-orchestrator';
import { featureContextService } from '../feature-context';

class AIThreadService {
  /* -------------------------------------------------------------------------- */
  /*                                 Threads                                    */
  /* -------------------------------------------------------------------------- */

  async create(userId: string, input: CreateThreadInput) {
    const [thread] = await db
      .insert(aiThreads)
      .values({
        featureId: input.featureId,
        title: input.title,
        type: input.type,
        createdBy: userId,
      })
      .returning();

    return thread!;
  }

  async get(threadId: string) {
    return db.query.aiThreads.findFirst({
      where: eq(aiThreads.id, threadId),
    });
  }

  async getOrCreateRequirementThread(userId: string, featureId: string) {
    const existing = await db.query.aiThreads.findFirst({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.featureId, featureId),
          operators.eq(fields.type, 'requirement_gathering')
        );
      },
    });

    if (existing) {
      return existing;
    }

    const result = await db
      .insert(aiThreads)
      .values({
        featureId,
        title: 'Requirement Gathering',
        type: 'requirement_gathering',
        createdBy: userId,
      })
      .returning();

    const thread = result[0];

    if (!thread) {
      throw new Error('Failed to create requirement thread');
    }

    await this.appendAssistantMessage(
      thread.id,
      `Hi! 👋 I'm ShipFlow AI.

      I'll help you gather everything needed before generating a PRD.

      Let's start with a simple question:

      What problem does this feature solve for your users?`
    );

    return thread;
  }

  async list(featureId: string) {
    return db.query.aiThreads.findMany({
      where: eq(aiThreads.featureId, featureId),
      orderBy(fields, operators) {
        return [operators.desc(fields.updatedAt)];
      },
    });
  }

  async delete(threadId: string) {
    await db.delete(aiThreads).where(eq(aiThreads.id, threadId));

    return {
      success: true,
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                                Messages                                    */
  /* -------------------------------------------------------------------------- */

  private async getNextSequence(threadId: string) {
    const lastMessage = await db.query.aiMessages.findFirst({
      where: eq(aiMessages.threadId, threadId),
      orderBy(fields, operators) {
        return [operators.desc(fields.sequence)];
      },
    });

    return (lastMessage?.sequence ?? 0) + 1;
  }

  private async createMessage(
    threadId: string,
    role: AIMessageRole,
    content: string,
    metadata?: unknown
  ) {
    const sequence = await this.getNextSequence(threadId);

    const [message] = await db
      .insert(aiMessages)
      .values({
        threadId,
        role,
        content,
        sequence,
        metadata,
      })
      .returning();

    return message!;
  }

  async sendUserMessage(input: SendMessageInput) {
    /* ------------------------------------------------------------------------ */
    /* Save User Message                                                        */
    /* ------------------------------------------------------------------------ */

    await this.createMessage(input.threadId, 'user', input.content);

    /* ------------------------------------------------------------------------ */
    /* Load Thread                                                              */
    /* ------------------------------------------------------------------------ */

    const thread = await this.get(input.threadId);

    if (!thread) {
      throw new Error('Thread not found');
    }

    /* ------------------------------------------------------------------------ */
    /* Load Conversation History                                                */
    /* ------------------------------------------------------------------------ */

    const history = await this.listMessages(thread.id);

    /* ------------------------------------------------------------------------ */
    /* Convert Messages                                                         */
    /* ------------------------------------------------------------------------ */

    const messages = history
      .filter((message) => message.role !== 'tool')
      .map((message) => ({
        role: message.role as 'user' | 'assistant' | 'system',

        content: message.content,
      }));

    /* ------------------------------------------------------------------------ */
    /* Ask AI                                                                   */
    /* ------------------------------------------------------------------------ */

    const aiResponse = await processRequirementConversation({
      messages,
    });

    const assistant = await this.appendAssistantMessage(
      thread.id,
      aiResponse.assistantMessage
    );

    await featureContextService.updateFromAI(thread.featureId, aiResponse);

    return {
      assistantMessage: assistant,
      featureId: thread.featureId,
    };
  }

  async appendAssistantMessage(
    threadId: string,
    content: string,
    metadata?: unknown
  ) {
    return this.createMessage(threadId, 'assistant', content, metadata);
  }

  async appendSystemMessage(
    threadId: string,
    content: string,
    metadata?: unknown
  ) {
    return this.createMessage(threadId, 'system', content, metadata);
  }

  async appendToolMessage(
    threadId: string,
    content: string,
    metadata?: unknown
  ) {
    return this.createMessage(threadId, 'tool', content, metadata);
  }

  async listMessages(threadId: string) {
    return db.query.aiMessages.findMany({
      where: eq(aiMessages.threadId, threadId),
      orderBy(fields, operators) {
        return [operators.asc(fields.sequence)];
      },
    });
  }
}

export default AIThreadService;
