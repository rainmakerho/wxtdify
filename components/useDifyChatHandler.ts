import { type ChatHandler, Message } from "@llamaindex/chat-ui";
import { ROLE_AI, ROLE_HUMAN } from "../constants";
import { useMessageContext } from "./MessageContext";
import { settingStorage, defaultSettings } from "@/utils/storage";
import type { SettingValues } from "@/types/setting";
import { FetchResult } from "@/types/fetchResult";
import { useChatContext } from "@/components/ChatContext";

let user = `scarDify`;

export function useDifyChatHandler(): ChatHandler {
  const [settings, setSettings] = useState<SettingValues>(defaultSettings);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const controllerRef = useRef<AbortController | null>(null);
  const { message, setMessage } = useMessageContext();
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    settingStorage
      .getValue()
      .then((storedSettings) => {
        if (storedSettings) {
          setSettings(storedSettings);
        }
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
      });
  }, []);

  useEffect(() => {
    const stateMessages =
      state.conversations.find((c) => c.conversationId === state.conversationId)
        ?.messages ?? [];
    setMessages(stateMessages);
  }, [state]);

  useEffect(() => {
    const callAppend = async (companyName: string) => {
      const message: Message = {
        role: ROLE_HUMAN,
        content: companyName,
      };
      await append(message);
    };
    if (message) {
      console.log("message effect ", message);
      try {
        const companyInfo: any = JSON.parse(message);
        const companyName = companyInfo.companyName || "";
        setInput(companyName || "");
        setMessage("");
      } catch (e) {
        console.error("解析 message 失敗:", e);
      }
    }
  }, [message]);

  const append: ChatHandler["append"] = async (message) => {
    setIsLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    let query = message.content.trim();
    dispatch({ type: "APPEND_MESSAGE", payload: { messages: [message] } });
    const { apiUrl, apiKey } = settings;
    let ftechResult: FetchResult = {
      content: "",
      conversationId: state.conversationId,
    };
    try {
      const streamProcessParams: StreamProcessParams = {
        baseUrl: apiUrl,
        apiKey,
        query,
        conversationId: state.conversationId,
        user,
        signal: controller.signal,
      };

      ftechResult = await fetchStreamingAIResponse(streamProcessParams);

      setInput("");
    } catch (e) {
      console.error("Error in append:", e);
      if (e instanceof TypeError) {
        ftechResult.content = `發生錯誤，請檢查是否可以正常連到 Dify。${e}`;
      } else if (e instanceof DOMException && e.name === "AbortError") {
        ftechResult.content = `使用者已取消。請重新輸入問題。`;
      } else {
        ftechResult.content = `發生錯誤，請稍後再試。${e}`;
      }
    } finally {
      setIsLoading(false);
      controllerRef.current = null;
    }
    const ftechMessage: Message = {
      content: ftechResult.content,
      role: ROLE_AI,
    };

    dispatch({ type: "APPEND_MESSAGE", payload: { messages: [ftechMessage] } });
    if (!state.conversationId && ftechResult.conversationId) {
      dispatch({
        type: "UPDATE_CONVERSATION_ID",
        payload: ftechResult.conversationId,
      });
    }
    return null;
  };

  const stop = () => {
    controllerRef.current?.abort();
  };

  return {
    input,
    setInput,
    isLoading,
    messages,
    stop,
    append,
    //setMessages,
  };
}
