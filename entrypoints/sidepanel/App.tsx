import ChatHeader from "@/components/ChatHeader";
import ChatPanel from "@/components/ChatPanel";
import SettingUI from "@/components/SettingUI";
import ConversationList from "@/components/ConversationList";
import { ViewType, ViewTypes } from "@/types/viewType";
import { conversationListStorage } from "@/utils/storage";
import { useChatContext } from "@/components/ChatContext";

function App() {
  const [view, setView] = useState<ViewType>(ViewTypes.chat);
  const { state, dispatch } = useChatContext();
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(() => {
    if (isStorageLoaded) {
      console.log("app state change:", state);
      conversationListStorage.setValue(state);
    }
  }, [state, isStorageLoaded]);

  useEffect(() => {
    console.log("app init");
    conversationListStorage
      .getValue()
      .then((data) => {
        console.log("fetch storage:", data);
        dispatch({ type: "INIT", payload: data });
        setIsStorageLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load conversations:", err);
        setIsStorageLoaded(true);
      });
  }, []);

  const newConversationId = "";
  const handleDeleteConversation = (conversationId: string) => {
    dispatch({ type: "DELETE_CONVERSATION", payload: conversationId });
  };

  const handleNewConversation = () => {
    dispatch({ type: "ADD_CONVERSATION" });
  };

  const handleSwitchConversation = (conversationId: string) => {
    dispatch({ type: "SWITCH_CONVERSATION", payload: conversationId });
  };

  return (
    <>
      <div className="flex flex-col h-full w-full text-sm">
        <ChatHeader
          view={view}
          onChangeView={setView}
          onNewConversation={handleNewConversation}
        />
        {view === ViewTypes.chat && <ChatPanel />}
        {view === ViewTypes.settings && <SettingUI />}
        {view === ViewTypes.conversations && (
          <ConversationList
            onSelect={handleSwitchConversation}
            onDelete={handleDeleteConversation}
          />
        )}
      </div>
    </>
  );
}

export default App;
