import { defineConfig } from "@playwright/test";

// Usa o Chrome instalado no sistema (channel: "chrome"), sem baixar navegadores.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4319",
    channel: "chrome",
    trace: "off",
  },
  webServer: {
    command: "npm run build && npx vite preview --port 4319 --strictPort",
    url: "http://localhost:4319",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
