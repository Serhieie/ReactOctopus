import axios from 'axios';

axios.defaults.baseURL = '';

export const setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const instance = axios.create({
//   baseURL: 'https://connections-api.herokuapp.com',
//   timeout: 15000,
// });

// const setToken = (token) => {
//   if (token) {
//     return (instance.defaults.headers.authorization = `Bearer ${token}`);
//   } else {
//     instance.defaults.headers.authorization = '';
//   }
// };

export const deleteToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = async () => {};

export const login = async () => {};

export const logout = async () => {};

export const checkTokenRequest = async (token) => {
  setToken(token);
  // try {
  //   const response = await instance('/users/current');
  //   return response;
  // } catch (error) {
  //   setToken();
  //   throw error;
  // }
};
