import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Enable exporting as ReactComponent
      svgrOptions: {
        icon: true, // Adjust this if you need to customize SVG properties
      },
      include: "**/*.svg?react",
    })
  ],
})
