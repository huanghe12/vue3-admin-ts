import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
// import { Expand } from '@element-plus/icons'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 全局注册el-icon,貌似不管用
// app.component('Expand', Expand)

app.use(router).use(ElementPlus)

app.mount('#app')
