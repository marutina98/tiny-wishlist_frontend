import type { RouteLocationNormalized } from 'vue-router';
import type IAuth from '@/interfaces/auth.interface';

import { inject } from 'vue';

export function GIsGuest (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) {

  const auth = inject('auth') as IAuth;
  const isGuest = auth.isGuest();

  if (isGuest) {
    next();
  } else {
    next({ path: '/' });
  }

}