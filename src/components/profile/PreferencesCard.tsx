import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Bell, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
];

const PreferencesCard: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("en");
  const [notif, setNotif] = useState({ email: true, push: false, sms: false });
  const [saving, setSaving] = useState(false);

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    toast(<div> title: "Theme changed",</div>);
  };

  const handleNotifToggle = (type: keyof typeof notif) => {
    setNotif((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast(<div> title: "Theme changed",</div>);
    }, 900);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="card-gradient bg-white/80 dark:bg-[#1A1F2C]/80 shadow rounded-2xl px-4 py-6 flex flex-col gap-6"
    >
      <h2 className="font-semibold text-xl flex items-center gap-2 text-[#7E69AB] dark:text-white mb-2">
        Preferences
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Language */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-[#6E59A5] dark:text-white">
            Language
          </label>
          <select
            value={language}
            onChange={handleLanguage}
            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-[#222236] bg-white dark:bg-[#1A1F2C] focus:ring-[#9b87f5]"
          >
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Theme */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-[#6E59A5] dark:text-white flex items-center gap-2">
            Theme
            {theme === "light" ? (
              <Sun size={16} className="ml-1" />
            ) : (
              <Moon size={16} className="ml-1" />
            )}
          </label>
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
            <span className="ml-2 text-sm">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </div>
        </div>
        {/* Notification Preferences */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-[#6E59A5] dark:text-white">
            Notifications
          </label>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
              <Switch
                checked={notif.email}
                onCheckedChange={() => handleNotifToggle("email")}
              />
              <Mail size={14} /> Email
            </label>
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
              <Switch
                checked={notif.push}
                onCheckedChange={() => handleNotifToggle("push")}
              />
              <Bell size={14} /> Push
            </label>
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
              <Switch
                checked={notif.sms}
                onCheckedChange={() => handleNotifToggle("sms")}
              />
              <Phone size={14} /> SMS
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={saving}
          className="bg-[#7e69ab] hover:bg-[#8B5CF6] text-white px-8 py-2"
        >
          {saving ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-80"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </form>
  );
};
export default PreferencesCard;
