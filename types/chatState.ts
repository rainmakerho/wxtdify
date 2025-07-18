
import { ConversationItem } from "./conversationItem";

export type ChatState = {
  conversationId: string;
  conversations: ConversationItem[];
};