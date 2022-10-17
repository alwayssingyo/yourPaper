import '@babel/polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import actions from './utils/actions'

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(store)
  .use(router)
  .use(actions)
  .mount('#app');
  