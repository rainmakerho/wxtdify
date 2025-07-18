import { onMessage } from "@/utils/messages/messaging";
import { SET_INPUT_MESSAGE } from "@/constants";
import React, { createContext, useContext, useState, useEffect } from "react";

interface MessageContextType {
  message: string | null;
  setMessage: (msg: string | null) => void;
}

const MessageContext = createContext<MessageContextType>({
  message: null,
  setMessage: () => {},
});

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const listener = onMessage(SET_INPUT_MESSAGE, (msg) => {
      console.log("sidepanel - Received message:", msg.data);
      setMessage(msg.data);
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
