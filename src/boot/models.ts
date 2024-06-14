import {App} from "vue";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        // $brief: BriefRepo;
    }
}

const modelsBoot = (app: App) => {
    app.config.globalProperties
    // app.config.globalProperties.$brief = briefRepo
}

export {modelsBoot};
