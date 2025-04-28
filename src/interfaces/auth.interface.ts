export default interface IAuth {
  register: Function,
  login: Function,
  logout: Function,
  addToken: Function,
  getToken: Function,
  removeToken: Function,
  isAuthenticated: Function,
  isGuest: Function,
  deleteItem: Function,
}