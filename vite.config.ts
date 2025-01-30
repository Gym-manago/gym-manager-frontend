import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { config } from 'dotenv';
import { resolve } from 'path';

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: +(process.env.VITE_PORT || 3001),
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: { '~': resolve(__dirname, 'src') },
  },
});
