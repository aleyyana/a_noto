import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


/* eslint-disable no-new */
createApp(App).use(store).use(router).use(VCalendar,{}).mount('#app')
