import axiosClient from './axiosClient';

const authApi = {
  login: async (authKey: string) => {
    return await axiosClient.post('/auth', null, {
      headers: {
        Authorization: authKey
      }
    });
  }
};

export default authApi;
