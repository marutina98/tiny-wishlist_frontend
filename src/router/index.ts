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
import type IList from '@/interfaces/list.interface';

const routes = [

  {
    path: '/:pathMatch(.*)*',
    component: ErrorRedirect,
  },

  {
    path: '/error/404',
    component: Error404View,
    meta: {
      title: '404 Error'
    }
  },

  {
    path: '/error/list',
    component: ErrorListView,
    meta: {
      title: 'List Not Found'
    }
  },

  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },

  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsGuest(to, from, next);
    },
    meta: {
      title: 'Login'
    }
  },

  {
    path: '/register',
    component: RegisterView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsGuest(to, from, next);
    },
    meta: {
      title: 'Register'
    }
  },

  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      GIsUser(to, from, next);
    },
    meta: {
      title: 'Dashboard'
    }
  },

  // @todo: list title as title

  {
    path: '/list/:id',
    component: ListView,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// change title before entering route

router.beforeEach(async (to, from, next) => {

  // Get token via auth

  const auth = inject('auth') as IAuth;
  const token = auth.getToken();
  
  const appName = 'Tiny Wishlist';

  const { title } = to.meta;

  const getDefaultTitle = () => {
    return title ? `${title} - ${appName}` : appName;
  }

  const id = to.params.id as string ?? null;

  // If id is present, and in listView
  // fetch list data and change title
  // otherwise get default title

  if (to.path.includes('/list/')) {

    // fetch list

    const request = await SApi.getList(id, token);

    if (request.ok) {
      const response = await request.json() as IList;
      document.title = `${response.title} - ${appName}`;
    } else {
      document.title = getDefaultTitle();
    }

  } else {
    document.title = getDefaultTitle();
  }

  next();

});

export default router;