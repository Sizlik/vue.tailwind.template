import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $api: AxiosInstance;
    }
}

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9000/api/v1' : '/api/v1';

const api = axios.create({ baseURL });

export { api };