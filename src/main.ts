import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import router from './router'
import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component
import '@/router/permission'
import "element-plus/dist/index.css"
import "@/styles/index.scss"
// main.ts
import 'virtual:svg-icons-register';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) { //注册所有的 Element Plus Icon
  app.component(key, component)
}
app.component("SvgIcon", SvgIcon)


router.isReady().then(() => {
  app.mount("#app")
})
