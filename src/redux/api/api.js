import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'https://reactoctopus-back.onrender.com/api',
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

export const edit = async (credentials) => {
  const response = await axios.patch('/users/edit', credentials);
  setToken();
  return response;
};

export default instance;
