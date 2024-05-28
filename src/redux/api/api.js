import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
});

export const setToken = (token) => {
  console.log(token);
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  } else {
    instance.defaults.headers.authorization = '';
  }
};

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await instance.post('/auth/refresh', {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          setToken(accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.authorization = `Bearer ${accessToken}`;

          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const register = async (body) => {
  const response = await instance.post('/auth/register', body);
  setToken(response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response;
};

export const login = async (body) => {
  const response = await instance.post('/auth/login', body);
  setToken(response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
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
