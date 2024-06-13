import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/routes.ts";
import './assets/tailwind.css';
import {api} from "src/boot/axios.ts";
import axios from "axios";

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$api = api

app.use(router)
app.mount('#app')
