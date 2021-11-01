import Cookies from 'js-cookie';

const userToken = 'ChitChatUserToken';

interface Utils {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}

const utils: Utils = {
  getToken() {
    return Cookies.get(userToken) || null;
  },
  setToken(token) {
    Cookies.set(userToken, token);
  },
  removeToken() {
    Cookies.remove(userToken);
  },
};

export default utils;
