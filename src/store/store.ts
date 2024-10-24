import { makeAutoObservable } from 'mobx';
import { authStore, AuthStore } from './authStore';
import { trackerStore, TrackerStore } from './trackerStore';

class Store {
  authStore: AuthStore;
  trackerStore: TrackerStore;

  constructor() {
    this.authStore = authStore;
    this.trackerStore = trackerStore;

    makeAutoObservable(this);
  }
}

export const store = new Store();
