import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: {
        enabled: true, // Enable PWA in development
      },
      manifest: {
        name: "Console.log",
        short_name: "Console.log",
        description: 'O melhor blog de programação para desenvolvedores.',
        start_url: "/",
        scope: "/",
        lang: "pt-PT",
        dir: "ltr",
        categories: ["programação", "tecnologia", "desenvolvimento"],
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            "src": "/screenshots/mobile.jpeg",
            "sizes": "360x751",
            "type": "image/jpeg"
          },
          {
            "src": "/screenshots/desktop.png",
            "sizes": "2560x1600",
            "type": "image/png",
            "form_factor": "wide"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
