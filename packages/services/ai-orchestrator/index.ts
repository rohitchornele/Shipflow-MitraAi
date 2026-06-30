import { generateText } from 'ai';

import { openrouter } from '../ai/client';
import { REQUIREMENT_MODEL } from '../ai/models';

import { REQUIREMENT_SYSTEM_PROMPT } from './prompt';

export type RequirementContext = {
  assistantMessage: string;
  summary: string;
  completion: number;
  missingItems: string[];
  requirements: Record<string, unknown>;
};

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
  const prompt = buildConversation(input.messages);

  const { text } = await generateText({
    model: openrouter(REQUIREMENT_MODEL),
    system: REQUIREMENT_SYSTEM_PROMPT,
    prompt,
  });

  return JSON.parse(text);
}