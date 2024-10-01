import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 引入 Font Awesome 核心库
import { library } from '@fortawesome/fontawesome-svg-core'

// 引入你想使用的图标库
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// 引入 Font Awesome Vue 组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 将图标添加到库中
library.add(faSearch)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
