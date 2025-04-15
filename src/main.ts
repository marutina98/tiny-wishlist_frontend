import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { usePrimeVue } from 'primevue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(usePrimeVue);
app.use(router);

app.mount('#app');
