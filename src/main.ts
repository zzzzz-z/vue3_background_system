import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import '@/assets/css/index.css'
import useLoginStore from './stores/login'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadingLocalData()
app.use(router)
app.mount('#app')

