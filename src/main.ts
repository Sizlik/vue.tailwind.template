import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/routes.ts";
import './assets/tailwind.css';
import {registerBoot} from "src/boot";

const app = createApp(App)

registerBoot(app)

app.use(router)
app.mount('#app')
