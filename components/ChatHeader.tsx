import { Settings, MessagesSquare, ArrowLeft, Plus } from "lucide-react";
import { ViewType, ViewTypes } from "@/types/viewType";

interface ChatHeaderProps {
  view: ViewType;
  onChangeView: (view: ViewType) => void;
  onNewConversation: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  view,
  onChangeView,
  onNewConversation,
}) => {
  return (
    <div className="flex items-center justify-between px-4 h-10 bg-[var(--background)] border-b border-[var(--border)] shadow-xs">
      {view !== ViewTypes.chat ? (
        <button
          className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors cursor-pointer"
          title="Back to Chat"
          onClick={() => onChangeView(ViewTypes.chat)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      ) : (
        <div />
      )}

      <div className="flex items-center ml-auto">
        {view === ViewTypes.chat && (
          <>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors cursor-pointer"
              title="Conversations"
              onClick={() => onChangeView(ViewTypes.conversations)}
            >
              <MessagesSquare className="w-5 h-5" />
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] ml-2 transition-colors cursor-pointer "
              title="Settings"
              onClick={() => onChangeView(ViewTypes.settings)}
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors ml-2 cursor-pointer"
              title="New Conversation"
              onClick={onNewConversation}
            >
              <Plus className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default ChatHeader;
