import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./locale";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

loadFonts();

const app = createApp(App);
const pinia = createPinia();

pinia.use(
  createPersistedState({
    // storage: customLocalStorage(),
    key: (id) => `__persisted__${id}`,
  })
);
app.use(pinia);
app.use(i18n);
app.use(router);
app.use(vuetify);

app.mount("#app");
