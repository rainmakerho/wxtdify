import { ConversationItem } from "@/types/conversationItem";
import { format, isToday, isYesterday } from "date-fns";
import { Trash2 } from "lucide-react";
import { ROLE_HUMAN } from "../constants";
import { useChatContext } from "@/components/ChatContext";

const conversationMaxLength = 20;
interface ConversationListProp {
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProp> = ({
  onSelect,
  onDelete,
}) => {
  const { state } = useChatContext();
  const grouped = useMemo(
    () => groupByDate(state.conversations),
    [state.conversations]
  );

  return (
    <div className="flex flex-col gap-2">
      {grouped.map((group) => (
        <div key={group.label}>
          <div className="text-xs text-[var(--primary)] font-semibold mb-1 px-2">
            {group.label}
          </div>
          <ul>
            {group.conversations.map((c) => (
              <li
                key={c.conversationId}
                className={[
                  "flex items-center justify-between px-2 py-2 rounded-xl",
                  "hover:bg-[var(--primary)]",
                  "hover:text-[var(--primary-foreground)]",
                  "transition-colors",
                  "cursor-pointer",
                  state.conversationId === c.conversationId
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "",
                ].join(" ")}
                onClick={() => onSelect?.(c.conversationId)}
              >
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="truncate">
                    {truncate(
                      [...c.messages]
                        .reverse()
                        .find((msg) => msg.role === ROLE_HUMAN)?.content ?? ""
                    )}
                  </div>
                  <div className="text-xs ">
                    {format(new Date(c.updatedAt), "HH:mm")}({c.conversationId})
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-2 flex items-center justify-center w-8 h-8 rounded-xl
          hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors cursor-pointer"
                  onClick={(e) => {
                    console.log("delete conversation:", c.conversationId);
                    e.stopPropagation();
                    onDelete?.(c.conversationId);
                  }}
                  title={browser.i18n.getMessage("Delete" as any)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

function truncate(text: string, maxLength = conversationMaxLength): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

type GroupedConversations = {
  label: string;
  conversations: ConversationItem[];
};

function groupByDate(
  conversations: ConversationItem[]
): GroupedConversations[] {
  const today: ConversationItem[] = [];
  const yesterday: ConversationItem[] = [];
  const earlier: Record<string, ConversationItem[]> = {};

  conversations.forEach((c) => {
    const date = new Date(c.updatedAt);
    if (isToday(date)) {
      today.push(c);
    } else if (isYesterday(date)) {
      yesterday.push(c);
    } else {
      const key = format(date, "yyyy-MM-dd");
      earlier[key] = earlier[key] || [];
      earlier[key].push(c);
    }
  });

  const result: GroupedConversations[] = [];
  if (today.length) result.push({ label: "今天", conversations: today });
  if (yesterday.length)
    result.push({ label: "昨天", conversations: yesterday });
  Object.keys(earlier)
    .sort((a, b) => (a > b ? -1 : 1))
    .forEach((key) => {
      result.push({
        label: format(new Date(key), "yyyy-MM-dd"),
        conversations: earlier[key],
      });
    });
  return result;
}

export default ConversationList;
