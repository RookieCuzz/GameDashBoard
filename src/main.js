import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';  // 引入刚刚创建的路由配置
// 引入 Font Awesome 核心库
import { library } from '@fortawesome/fontawesome-svg-core'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入你想使用的图标库
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// 引入 Font Awesome Vue 组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // 导入 thumbs-up 图标

library.add(faThumbsUp);

// 将图标添加到库中
library.add(faSearch)
createApp(App).use(router).use(ElementPlus).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
