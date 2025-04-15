import type { App as Application } from 'vue';

class Auth {

  public async register() {
    console.log('Register');
  }

  public async login() {
    console.log('Login');
  }

  public logout() {
    console.log('Logout');
  }

}

export default {
  install: (app: Application) => {
    app.provide('auth', new Auth());
  }
}