import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/main.css';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import UUID from "vue-uuid";


/* eslint-disable no-new */
createApp(App).use(store).use(router).use(VCalendar,{}).use(UUID).mount('#app')
