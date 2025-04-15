import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Plugins

import ui from '@nuxt/ui/vue-plugin';
import PAuth from './plugins/auth.plugin';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ui);
app.use(PAuth);

app.mount('#app');
