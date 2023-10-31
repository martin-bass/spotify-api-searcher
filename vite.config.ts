import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.CLIENT_ID': process.env.VITE_CLIENT_ID,
    'import.meta.env.SECRET_CLIENT': process.env.VITE_SECRET_CLIENT,
  },
})
