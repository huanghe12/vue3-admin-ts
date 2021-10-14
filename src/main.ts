import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import filters from '@/utils/filters'

const app = createApp(App)

app.config.globalProperties.$filters = filters
app.use(router).use(ElementPlus)

app.mount('#app')
