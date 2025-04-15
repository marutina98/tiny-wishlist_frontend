import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vue

import App from './App.vue';
import router from './router';

// PrimeVue

import PrimeVue from 'primevue/config';

// PrimeVue Themes

import Nora from '@primeuix/themes/nora';

// import Aura from '@primeuix/themes/aura';
// import Lara from '@primeuix/themes/lara';
// import Material from '@primeuix/themes/material';

const primeVueSettings = {
  theme: {
    preset: Nora,
    options: {
      prefix: '.p',
      darkModeSelector: '.d',
      cssLayer: false,
    }
  }
}

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, primeVueSettings);
app.use(router);

app.mount('#app');
