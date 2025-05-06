import type IRequestLogin from '@/interfaces/request-login.interface';
import type IRequestConfig from '@/interfaces/request-config.interface';
import type IRequestRegister from '@/interfaces/request-register.interface';
import type IRequestUpdateUser from '@/interfaces/request-update-user.interface';
import type IRequestPutItem from '@/interfaces/request-put-item.interface';
import type IRequestNewList from '@/interfaces/request-new-list.interface';
import type IRequestNewItem from '@/interfaces/request-new-item.interface';
import type IRequestPutList from '@/interfaces/request-put-list.interface';
import type IRequestPutGroup from '@/interfaces/request-put-group.interface';
import type IRequestNewGroup from '@/interfaces/request-new-group.interface';

class SApi {

  private baseURL: string = 'http://localhost:3000';

  // Auth

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

  // List

  public async createList(body: IRequestNewList, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/list/`,
      method: 'POST',
      token: token,
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

  public async deleteList(id: string, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/list/${id}`,
      method: 'DELETE',
      token: token,
    });
  }

  public async putList(body: IRequestPutList, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/list/${body.id}`,
      method: 'PUT',
      token: token,
      body: JSON.stringify(body),
    });
  }

  // User

  public async getAuthenticatedUser(token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/user/auth`,
      method: 'GET',
      token: token,
    });
  }

  public async updateUser(body: IRequestUpdateUser, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/user`,
      method: 'PUT',
      body: JSON.stringify(body),
      token: token,
    });
  }

  // Group

  public async createGroup(body: IRequestNewGroup, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/group`,
      method: 'POST',
      body: JSON.stringify(body),
      token: token,
    });
  }

  public async putGroup(body: IRequestPutGroup, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/group/${body.id}`,
      method: 'PUT',
      token: token,
      body: JSON.stringify(body),
    });
  }

  public async putGroupArchivalStatus(id: string, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/group/${id}/archival`,
      method: 'PUT',
      token: token,
    });
  }

  public async deleteGroup(id: string, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/group/${id}`,
      method: 'DELETE',
      token: token,
    });
  }

  // Item
  
  public async createItem(data: IRequestNewItem, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/item`,
      method: 'POST',
      token: token,
      body: JSON.stringify(data),
    });
  }

  public async putItem(data: IRequestPutItem, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/item/${data.id}`,
      method: 'PUT',
      token: token,
      body: JSON.stringify(data),
    });
  }

  public async deleteItem(id: string, token: string) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/item/${id}`,
      method: 'DELETE',
      token: token,
    });
  }

  // Request

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