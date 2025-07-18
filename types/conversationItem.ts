import { Message } from "@llamaindex/chat-ui";

export interface ConversationItem {
  conversationId: string;
  messages: Message[];
  updatedAt: string;
}

