import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
});

const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  } else {
    instance.defaults.headers.authorization = '';
  }
};

// export const deleteToken = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

export const register = async (body) => {
  const response = await instance.post('/auth/register', body);
  setToken(response.data.token);
  return response;
};

export const login = async (body) => {
  const response = await instance.post('/auth/login', body);
  setToken(response.data.token);
  return response;
};

export const logout = async () => {
  const response = await instance.post('/auth/logout');
  setToken();
  return response;
};

export const updateProfile = async (body) => {
  const response = await instance.patch('/auth/update-profile', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const checkTokenRequest = async (token) => {
  setToken(token);
  try {
    const response = await instance('/auth/current');
    return response;
  } catch (error) {
    setToken();
    throw error;
  }
};

// export const edit = async (credentials) => {
//   const response = await instance.patch('/users/edit', credentials);
//   setToken();
//   return response;
// };

export const needHelp = async (credentials) => {
  try {
    const response = await instance.post('/needhelp', credentials);
    return response;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const ping = async () => {
  await instance('/auth/ping');
};

export default instance;
