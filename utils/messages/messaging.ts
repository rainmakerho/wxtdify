import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
  setInputMessage(data: string): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
