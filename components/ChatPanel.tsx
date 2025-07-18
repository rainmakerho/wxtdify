import { ChatSection, ChatMessages, ChatInput } from "@llamaindex/chat-ui";
import { useDifyChatHandler } from "./useDifyChatHandler";
import { i18n } from "#i18n";

const ChatPanel: React.FC = () => {
  const handler = useDifyChatHandler();

  return (
    <>
      <ChatSection
        handler={handler}
        className="flex-1 min-h-0 overflow-auto flex flex-col gap-0 p-0"
      >
        <ChatMessages className="p-1">
          <ChatMessages.List className="p-0"></ChatMessages.List>
          <ChatMessages.Empty
            heading={i18n.t("ChatMessages_Empty_heading")}
            subheading={i18n.t("ChatMessages_Empty_subheading")}
          />
        </ChatMessages>
        <ChatInput className="p-0">
          <ChatInput.Form>
            <ChatInput.Field placeholder={i18n.t("Input_Placeholder")} />
            {/* <ChatInput.Upload /> */}
            <ChatInput.Submit className="cursor-pointer"></ChatInput.Submit>
          </ChatInput.Form>
        </ChatInput>
      </ChatSection>
    </>
  );
};

export default ChatPanel;
