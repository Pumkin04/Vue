import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import  router  from './router.js'
import store from './Lab/index.js';
createApp(App).use(router).use(store).mount('#app')
import 'bootstrap/dist/css/bootstrap.min.css'
