import type { App as Application } from 'vue';

import { useCookies } from '@vueuse/integrations/useCookies';

class Auth {

  private cookie = useCookies(['token']);

  public async register() {
    console.log('Register');
  }

  public async login() {
    console.log('Login');
  }

  public logout() {
    this.removeToken();
  }

  public addToken(token: string) {
    this.cookie.set('token', token);
  }

  public removeToken() {
    this.cookie.remove('token');
  }

  public isAuthenticated() {
    return this.cookie.get('token') ? true : false;
  }

  public isGuest() {
    return !this.isAuthenticated;
  }

}

export default {
  install: (app: Application) => {
    app.provide('auth', new Auth());
  }
}