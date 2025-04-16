
// @todo: move interfaces in their own file

interface IRequest {
  apiURL: string,
  method: string,
  token?: string,
  body?: object,
}

interface IRequestRegister {
  email: string,
  username: string,
  password: string,
}

interface IRequestLogin {
  username: string,
  password: string,
}

class SApi {

  private baseURL: string = 'http://localhost:3000';

  public async register(body: IRequestRegister) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/auth/register`,
      method: 'POST',
      body
    });
  }

  public async login(body: IRequestLogin) {
    return await this.getRequest({
      apiURL: `${this.baseURL}/auth/login`,
      method: 'POST',
      body
    });
  }

  public getRequest(request: IRequest) {
    return fetch(request.apiURL, {
      mode: 'cors',
      method: request.method,
      headers: this.getHeaders(request),
    });
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