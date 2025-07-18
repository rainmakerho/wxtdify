import { FetchResult } from "@/types/fetchResult";

export type StreamProcessParams = {
  baseUrl: string;
  apiKey: string;
  query: string;
  conversationId: string;
  user: string;
  signal?: AbortSignal;
  onStartStreaming?: () => void;
  onMessage?: (chunk: string, conversation_id: string) => void;
};

export async function fetchStreamingAIResponse({
  baseUrl,
  apiKey,
  query,
  conversationId,
  user,
  signal,
  onStartStreaming,
  onMessage,
}: StreamProcessParams) {
  let result: FetchResult = {
    content: "",
    conversationId,
  };
  const response = await fetch(`${baseUrl}/chat-messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {},
      query,
      response_mode: "streaming",
      conversation_id: conversationId,
      user,
    }),
    signal,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (!response.body) throw new Error("No response body");

  const reader = response.body.getReader();
  let decoder = new TextDecoder();
  let messages = "";
  let isStartStreaming = false;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const chunkResult = processStreamChunk(
      chunk,
      conversationId || result.conversationId
    );
    messages += chunkResult.content;
    if (onStartStreaming && !isStartStreaming && messages.length > 0) {
      isStartStreaming = true;
      onStartStreaming();
    }
    if (
      chunkResult.conversationId &&
      chunkResult.conversationId !== result.conversationId
    ) {
      result.conversationId = chunkResult.conversationId;
    }
    if (onMessage) onMessage(messages, chunkResult.conversationId);
  }
  result.content = messages;
  return result;
}
