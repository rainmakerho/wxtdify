import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "WxtDify",
      description: "Wxt Dify Helper",
      version: "1.0.0",
      action: {},
      permissions: ["tabs", "storage"],
      host_permissions: ["<all_urls>"],
      default_locale: "en",
    };
  },
});
