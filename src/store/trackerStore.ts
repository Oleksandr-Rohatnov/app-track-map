import { makeAutoObservable } from 'mobx';
import trackerApi from '../api/trackerApi';
import { TrackerT } from '../types/tracker';

export class TrackerStore {
  trackers?: TrackerT[];
  lostTrackers?: TrackerT[];

  constructor() {
    makeAutoObservable(this);
  }

  async getTrackers() {
    try {
      const response = await trackerApi.getTrackers();
      if (response) {
        const oldData = [...(this.trackers || [])];
        const newData: TrackerT[] = response.data;
        const filteredData = oldData
          .filter((item) => !newData.some((newItem) => newItem.id === item.id));
        this.lostTrackers = [...(this.lostTrackers || []), ...filteredData];
        this.trackers = response.data;
      }
    } catch (error) {
      this.trackers = undefined;
    }
  }

  cleanupLostTrackers() {
    const now = Date.now();
    this.lostTrackers = this.lostTrackers?.filter((tracker) => {
      const lastUpdateTime = new Date(tracker.lastUpdate).getTime();
      return now - lastUpdateTime <= 300000; // 5 minutes
    });
  }
}

export const trackerStore = new TrackerStore();
