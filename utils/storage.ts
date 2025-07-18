import { storage } from "#imports";
import type { SettingValues } from "@/types/setting";
import { ConversationItem } from "@/types/conversationItem";
import { CONVERSATIONS_KEY, SETTING_KEY } from "@/constants";
import { ChatState } from "@/types/chatState";
import { initialState } from "@/components/ChatReducer";
export const defaultSettings: SettingValues = {
  apiUrl: "https://dify-api-url/v1",
  apiKey: "請輸入 api key",
};

export const settingStorage = storage.defineItem<SettingValues>(SETTING_KEY, {
  fallback: defaultSettings,
});

export const conversationListStorage = storage.defineItem<ChatState>(
  CONVERSATIONS_KEY,
  {
    fallback: initialState,
  }
);
