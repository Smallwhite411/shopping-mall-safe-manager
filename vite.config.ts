import { fileURLToPath, URL } from 'node:url'
import path from 'path-browserify';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': { //匹配请求路径
        target: "http://127.0.0.1:8899/",//代理的目标地址
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite:(path) => path.replace(/^\/api/, '')
      }
    }
  }
})
