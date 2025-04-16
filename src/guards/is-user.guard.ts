import type { RouteLocationNormalized } from 'vue-router';
import type IAuth from '@/interfaces/auth.interface';

import { inject } from 'vue';

export function GIsUser (to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const auth = inject('auth') as IAuth;
  return auth.isAuthenticated();
}