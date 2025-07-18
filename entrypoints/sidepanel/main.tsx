import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import "@llamaindex/chat-ui/styles/markdown.css";
import "@llamaindex/chat-ui/styles/pdf.css";
import { MessageProvider } from "@/components/MessageContext";
import { ChatProvider } from "@/components/ChatContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </ChatProvider>
  </React.StrictMode>
);
