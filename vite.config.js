import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy removed - using direct API URL from environment variable
    // Backend deployed at: https://cloud-drive-backend-iqjt.onrender.com
  },
});


