import {App} from "vue";
import {api} from "src/boot/axios.ts";
import axios from "axios";
import {modelsBoot} from 'src/boot/models'


export function registerBoot(app: App) {
    app.config.globalProperties.$api = api
    app.config.globalProperties.$axios = axios
    modelsBoot(app)
}