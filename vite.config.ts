import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 依存関係のうち、特定のライブラリを分割する
            if (id.includes('react')) {
              return 'react'; // Reactを個別のチャンクに分割
            }
            if (id.includes('three')) {
              return 'three'; // Three.jsを個別のチャンクに分割
            }
            // 他のすべての node_modules のモジュールを 'vendor' チャンクに
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // 警告しきい値を1MBに変更（必要に応じて）
  }
});