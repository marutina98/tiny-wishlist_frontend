import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ErrorRedirect from '@/components/ErrorRedirect.vue';

import { GIsUser } from '@/guards/is-user.guard';
import { GIsGuest } from '@/guards/is-guest.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/:pathMatch(.*)*',
      component: ErrorRedirect
    },

    {
      path: '/',
      component: HomeView,
    },

    {
      path: '/login',
      component: LoginView,
    }

  ],
});

export default router;