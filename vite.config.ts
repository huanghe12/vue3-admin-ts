import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 导入时想要省略的扩展名
  },
  base: './',
  server: {
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, // websoclet支持
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 引入全局样式
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'public/global.config.less')}";`,
        javascriptEnabled: true
      }
    }
  }
})
