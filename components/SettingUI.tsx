import { settingStorage, defaultSettings } from "@/utils/storage";
import { Toaster, toast } from "sonner";
import type { SettingValues } from "@/types/setting";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { i18n } from "#i18n";

const SettingUI: React.FC = () => {
  const [settings, setSettings] = useState<SettingValues>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
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

  const handleChange =
    (field: keyof SettingValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((s) => ({ ...s, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await settingStorage.setValue(settings);
      toast.success(i18n.t("SaveSuccess"), {
        duration: 1500,
        closeButton: true,
      });
    } catch (err) {
      toast.error(i18n.t("SaveFail"), {
        duration: 3000,
        closeButton: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <form
        className="h-full w-full flex-1 min-h-0 overflow-auto flex flex-col gap-2 p-1"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {i18n.t("DifyApiUrl")}
          </label>

          <input
            type="text"
            className="w-full rounded-lg border border-[var(--border)] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            value={settings.apiUrl}
            onChange={handleChange("apiUrl")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {i18n.t("DifyApiKey")}
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              className="w-full rounded-lg border border-[var(--border)] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={settings.apiKey}
              onChange={handleChange("apiKey")}
              required
            />
            <button
              type="button"
              onClick={() => setShowApiKey((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] cursor-pointer"
            >
              {showApiKey ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2 rounded-lg shadow-md hover:bg-[var(--primary-hover)] transition-colors font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? browser.i18n.getMessage("Saving" as any)
            : browser.i18n.getMessage("Save" as any)}
        </button>
      </form>
    </>
  );
};

export default SettingUI;
