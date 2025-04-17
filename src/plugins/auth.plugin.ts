import type { App as Application } from 'vue';

import { useCookies } from '@vueuse/integrations/useCookies';

import SApi from '@/services/api.service';
import type IRequestRegister from '@/interfaces/request-register.interface';
import type IRequestLogin from '@/interfaces/request-login.interface';

class Auth {

  private cookie = useCookies(['token']);

  public async register(body: IRequestRegister) {
    return SApi.register(body);
  }

  public async login(body: IRequestLogin) {
    return SApi.login(body);
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
    return !this.isAuthenticated();
  }

}

export default {
  install: (app: Application) => {
    app.provide('auth', new Auth());
  }
}