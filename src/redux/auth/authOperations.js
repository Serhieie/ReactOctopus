import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { register, login, logout, checkTokenRequest } from '../api/api';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (body, { rejectWithValue }) => {
    try {
      const response = await register(body);
      return response.data;
    } catch (error) {
      //переробити обробку помилок
      if (error.response.data.code === 11000) {
        Notify.failure(`User with email "${body.email}" already exists`);
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (body, { rejectWithValue }) => {
    try {
      const response = await login(body);
      return response.data;
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 400) {
        Notify.failure('Incorrect data. Try again');
      } else {
        Notify.failure(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const current = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await checkTokenRequest(auth.token);
      return response.data;
    } catch (error) {
      console.error(error.message);
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
