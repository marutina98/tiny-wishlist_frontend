import { createRouter, createWebHistory, type RouteLocationGeneric, type RouteLocationNormalized } from 'vue-router';
import { inject } from 'vue';

import SApi from '@/services/api.service';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ListView from '@/views/ListView.vue';
import ErrorRedirect from '@/components/ErrorRedirect.vue';
import Error404View from '@/views/Error404View.vue';
import ErrorListView from '@/views/ErrorListView.vue';

import { GIsUser } from '@/guards/is-user.guard';
import { GIsGuest } from '@/guards/is-guest.guard';

import type IAuth from '@/interfaces/auth.interface';

const routes = [

  {
    path: '/:pathMatch(.*)*',
    component: ErrorRedirect
  },

  {
    path: '/error/404',
    component: Error404View,
  },

  {
    path: '/error/list',
    component: ErrorListView,
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
  },

  {
    path: '/register',
    component: RegisterView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsGuest(to, from, next);
    }
  },

  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsUser(to, from, next);
    }
  },

  // Pass via props the request of the list

  {
    path: '/list/:id',
    component: ListView,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;