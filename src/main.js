import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// import BootstrapVue from 'bootstrap-vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import LocomotiveScrollPlugin from './plugins/locomotive-scroll';


/* eslint-disable no-new */
createApp(App).use(store).use(router).use(VCalendar,{}).use(LocomotiveScrollPlugin).mount('#app')
