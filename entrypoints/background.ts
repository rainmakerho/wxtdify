import { browser } from "wxt/browser";
import { onMessage } from "@/utils/messages/messaging";
import { SET_INPUT_MESSAGE } from "@/constants";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  onMessage(SET_INPUT_MESSAGE, (msg) => {
    console.log("bg - Received message:", msg.data);
  });
});
