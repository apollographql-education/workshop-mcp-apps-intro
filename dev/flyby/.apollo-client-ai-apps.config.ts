import { defineConfig } from "@apollo/client-ai-apps/config";

export default defineConfig({
  csp: {
    connectDomains: ["https://flyby-edu-router.up.railway.app"],
    resourceDomains: [
      "https://flyby-edu-router.up.railway.app",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ],
  },
  widgetSettings: {
    prefersBorder: true,
  },
});
