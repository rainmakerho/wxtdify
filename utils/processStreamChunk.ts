import { FetchResult } from "@/types/fetchResult";

export const processStreamChunk = (chunk: string, conversationId: string) => {
  const lines = chunk.split("\n");
  let isSetConversationId = false;
  let result: FetchResult = {
    content: "",
    conversationId,
  };
  let content = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("data:")) {
      try {
        const jsonStr = trimmed.replace(/^data:\s*/, "");
        if (!jsonStr) continue;
        const data = JSON.parse(jsonStr);
        if (!isSetConversationId && !conversationId && data.conversation_id) {
          result.conversationId = data.conversation_id;
          isSetConversationId = true;
        }
        if (data.answer) {
          content += data.answer;
        }
      } catch (e) {
        console.log("chunk error:", e);
      }
    }
  }
  result.content = content;
  return result;
};
