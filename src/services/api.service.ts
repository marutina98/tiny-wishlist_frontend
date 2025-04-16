interface IRequest {
  apiURL: string,
  method: string,
  token?: string,
  body?: string,
}

class SApi {

  private baseURL: string = 'http://localhost:3000/';

  public async register() {

  }

  public async login() {

  }

  public getRequest({ request }: { request: IRequest }) {

    const headers = this.getHeaders(request);

    return fetch(request.apiURL, {
      mode: 'cors',
      method: request.method,
      headers
    });

  }

  public getHeaders({ method, token }: { method: string, token?: string }) {

    const headers = [
      ['Access-Control-Allow-Headers', '*'],
    ];

    const contentTypeJSON = ['POST', 'PUT'];

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