import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  use: {
    baseURL: "http://localhost:5173",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: "on",
  },
  webServer: {
    command: "vite dev",
    port: 5173,
    reuseExistingServer: true,
  },
});
