import type { RouteLocationNormalized } from 'vue-router';
import type IAuth from '@/interfaces/auth.interface';

import { inject } from 'vue';

export function GIsUser (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) {

  const auth = inject('auth') as IAuth;
  const isAuthenticated = auth.isAuthenticated();

  if (isAuthenticated) {
    next();
  } else {
    next({ path: '/' });
  }

}