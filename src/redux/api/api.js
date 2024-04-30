import axios from 'axios';

axios.defaults.baseURL = '';

export const setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = async () => {};

export const login = async () => {};

export const logout = async () => {};
