import { Message } from "@llamaindex/chat-ui";
import { ChatState } from "@/types/chatState";
import { ROLE_AI } from "../constants";

export type ChatAction =
  | { type: "INIT"; payload: ChatState }
  | { type: "SWITCH_CONVERSATION"; payload: string }
  | { type: "ADD_CONVERSATION" }
  | { type: "DELETE_CONVERSATION"; payload: string }
  | { type: "APPEND_MESSAGE"; payload: { messages: Message[] } }
  | { type: "LOAD_FROM_STORAGE"; payload: ChatState }
  | { type: "UPDATE_CONVERSATION_ID"; payload: string }
  | {
      type: "UPDATE_LAST_AI_MESSAGE";
      payload: { content: string; conversationId?: string };
    };

const newConversationItem = () => {
  return {
    conversationId: "",
    updatedAt: new Date().toISOString(),
    messages: [],
  };
};

export const initialState: ChatState = {
  conversationId: "",
  conversations: [newConversationItem()],
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "INIT": {
      return action.payload && action.payload.conversations
        ? action.payload
        : initialState;
    }
    case "SWITCH_CONVERSATION": {
      return {
        ...state,
        conversationId: action.payload,
      };
    }
    case "ADD_CONVERSATION": {
      const newId = "";
      const filtered = state.conversations.filter(
        (c) => c.conversationId === newId
      );
      const returnConvs = [...state.conversations];
      if (filtered.length === 0) {
        returnConvs.push(newConversationItem());
      }
      return {
        ...state,
        conversationId: newId,
        conversations: [...returnConvs],
      };
    }
    case "DELETE_CONVERSATION": {
      const filtered = state.conversations.filter(
        (c) => c.conversationId !== action.payload
      );
      let newId = "";
      if (filtered.length === 0) {
        return {
          conversationId: "",
          conversations: [newConversationItem()],
        };
      }
      newId = filtered[0].conversationId;
      return {
        conversationId: newId,
        conversations: filtered,
      };
    }
    case "UPDATE_CONVERSATION_ID": {
      const newId = action.payload;
      return {
        ...state,
        conversationId: newId,
        conversations: state.conversations.map((c) =>
          c.conversationId === "" ? { ...c, conversationId: newId } : c
        ),
      };
    }
    case "APPEND_MESSAGE": {
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.conversationId === state.conversationId
            ? {
                ...c,
                messages: [...c.messages, ...action.payload.messages],
              }
            : c
        ),
      };
    }
    case "UPDATE_LAST_AI_MESSAGE": {
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.conversationId ===
          (action.payload.conversationId ?? state.conversationId)
            ? {
                ...c,
                messages: c.messages.map((m, idx, arr) =>
                  idx === arr.length - 1 && m.role === ROLE_AI
                    ? { ...m, content: action.payload.content }
                    : m
                ),
              }
            : c
        ),
      };
    }
    default:
      return state;
  }
}
