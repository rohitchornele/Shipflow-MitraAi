'use client';

import { useState } from 'react';

import { Loader2, Send } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';

type AIChatInputProps = {
  onSend(
    message: string
  ): Promise<void> | void;

  isSending?: boolean;
};

export function AIChatInput({
  onSend,
  isSending,
}: AIChatInputProps) {
  const [message, setMessage] =
    useState('');

  async function handleSend() {
    const value = message.trim();

    if (!value) return;

    await onSend(value);

    setMessage('');
  }

  return (
    <div className="flex gap-3 border-t p-4">
      <Textarea
        value={message}
        rows={2}
        placeholder="Ask ShipFlow AI..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !e.shiftKey
          ) {
            e.preventDefault();

            handleSend();
          }
        }}
      />

      <Button
        size="icon"
        disabled={
          isSending || !message.trim()
        }
        onClick={handleSend}
      >
        {isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}