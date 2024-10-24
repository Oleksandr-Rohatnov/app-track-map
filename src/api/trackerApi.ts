import axiosClient from './axiosClient';

const trackerApi = {
  getTrackers: () => {
    return axiosClient.get('/trackers');
  }
};

export default trackerApi;
