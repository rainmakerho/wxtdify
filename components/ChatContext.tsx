import React, { useReducer, useContext, createContext } from "react";
import { chatReducer, initialState } from "@/components/ChatReducer";
import { ChatState } from "@/types/chatState";
type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<any>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext 必須在 <ChatProvider> 內使用");
  return ctx;
}
