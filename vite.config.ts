import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 5173 falls inside a Windows Hyper-V/WSL reserved port range on this machine (EACCES on bind);
  // 5500 sits outside every excluded range (`netsh interface ipv4 show excludedportrange protocol=tcp`).
  server: { host: '127.0.0.1', port: 5500, strictPort: true },
});
