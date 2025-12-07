import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { setupGuards } from "./router/guards";

setupGuards(router);

createApp(App).use(router).mount("#app");
