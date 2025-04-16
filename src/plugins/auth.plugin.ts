import type { App as Application } from 'vue';

import { useCookies } from '@vueuse/integrations/useCookies';

class Auth {

  public cookie = useCookies(['token']);

  public async register() {
    console.log('Register');
  }

  public async login() {
    console.log('Login');
  }

  public logout() {
    console.log('Logout');
  }

  public addToken(token: string) {
    this.cookie.set('token', token);
  }

  public removeToken() {
    this.cookie.remove('token');
  }

}

export default {
  install: (app: Application) => {
    app.provide('auth', new Auth());
  }
}