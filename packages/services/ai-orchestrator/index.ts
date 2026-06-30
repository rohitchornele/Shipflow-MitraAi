import { generateObject } from 'ai';
import { z } from 'zod';

import { openrouter } from '../ai/client';
import { REQUIREMENT_MODEL } from '../ai/models';

import { REQUIREMENT_SYSTEM_PROMPT } from './prompt';
import { RequirementContextSchema } from '../ai/requirement/model';



export type RequirementContext = z.infer<
  typeof RequirementContextSchema
>;

export type ConversationMessage = {
  role: 'user' | 'assistant' | 'system';

  content: string;
};

type ProcessRequirementConversationInput = {
  messages: ConversationMessage[];
};

function buildConversation(
  messages: ConversationMessage[]
) {
  return messages
    .map(
      (message) =>
        `${message.role.toUpperCase()}:\n${message.content}`
    )
    .join('\n\n');
}

export async function processRequirementConversation(
  input: ProcessRequirementConversationInput
): Promise<RequirementContext> {
  const prompt = buildConversation(
    input.messages
  );

  const { object } = await generateObject({
    model: openrouter(REQUIREMENT_MODEL),

    system: REQUIREMENT_SYSTEM_PROMPT,

    prompt,

    schema: RequirementContextSchema,
  });

  return object;
}