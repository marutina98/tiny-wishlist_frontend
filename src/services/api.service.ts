import type IRequestLogin from '@/interfaces/request-login.interface';
import type IRequestConfig from '@/interfaces/request-config.interface';
import type IRequestRegister from '@/interfaces/request-register.interface';
import type IRequestUpdateUser from '@/interfaces/request-update-user.interface';

class SApi {

  private baseURL: string = 'http://localhost:3000';

  public async register(body: IRequestRegister) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/auth/register`,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async login(body: IRequestLogin) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/auth/login`,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async getList(id: string, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/list/${id}`,
      method: 'GET',
      token: token,
    });
  }

  public async getAuthenticatedUser(token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/user/auth`,
      method: 'GET',
      token: token,
    });
  }

  public async updateUser(data: IRequestUpdateUser, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/user`,
      method: 'PUT',
      token: token,
    });
  }

  public getRequest(requestConfig: IRequestConfig) {

    const settings: RequestInit = {
      mode: 'cors',
      method: requestConfig.method,
      headers: this.getHeaders(requestConfig),
    }

    const body = requestConfig.body;
    if (body) settings.body = body;

    return fetch(requestConfig.apiURL, settings);
    
  }

  public getHeaders({ method, token }: { method: string, token?: string }) {

    const contentTypeJSON = ['POST', 'PUT'];

    const headers = [
      ['Access-Control-Allow-Headers', '*'],
    ];

    if (contentTypeJSON.includes(method)) {
      headers.push(['Content-Type', 'application/json']);
    }

    if (token) {
      headers.push(['Authorization', `Bearer ${token}`]);
    }

    return Object.fromEntries(headers);

  }

}

export default new SApi();