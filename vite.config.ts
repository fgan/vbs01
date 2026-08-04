import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://fgan.github.io/vbs01/, so asset URLs need the repo name
// as their base. Change this if the repo is ever renamed.
// https://vite.dev/config/
export default defineConfig({
  base: '/vbs01/',
  plugins: [react()],
})
