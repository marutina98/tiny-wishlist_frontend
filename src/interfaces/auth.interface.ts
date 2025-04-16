export default interface IAuth {
  register: Function,
  login: Function,
  logout: Function,
  addToken: Function,
  removeToken: Function,
  isAuthenticated: Function,
  isGuest: Function,
}