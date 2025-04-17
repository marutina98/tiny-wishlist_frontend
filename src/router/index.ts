import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ErrorRedirect from '@/components/ErrorRedirect.vue';
import Error404View from '@/views/Error404View.vue';

import { GIsUser } from '@/guards/is-user.guard';
import { GIsGuest } from '@/guards/is-guest.guard';

const routes = [

  {
    path: '/:pathMatch(.*)*',
    component: ErrorRedirect
  },

  {
    path: '/404',
    component: Error404View,
  },

  {
    path: '/',
    component: HomeView,
  },

  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsGuest(to, from, next);
    }
  }

];

// import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;