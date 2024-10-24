import { makeAutoObservable } from 'mobx';
import { removeAuthKeyFromLocalStorage, setAuthKeyToLocalStorage } from '../helpers/localStorage';
import authApi from '../api/authApi';

export class AuthStore {
  authKey?: string;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthKey(key: string) {
    this.authKey = key;
    setAuthKeyToLocalStorage(key);
  }

  async login(key: string) {
    try {
      await authApi.login(key);
      this.setAuthKey(key);
      return true;
    } catch {
      return false;
    }
  }

  logout() {
    removeAuthKeyFromLocalStorage();
    this.authKey = undefined;
  }
}

export const authStore = new AuthStore();
