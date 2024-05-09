import { showSuccessToast, showErrorToast } from '../showToast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  register,
  login,
  logout,
  checkTokenRequest,
  needHelp,
  updateProfile,
} from '../api/api';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (body, { rejectWithValue }) => {
    try {
      const response = await register(body);
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        Notify.failure(`User with email "${body.email}" already exists`);
      }
      Notify.failure(error.response.data.message);
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
      if (error.response.status === 600) {
        Notify.failure(error.response.data.message);
      }
      if (error.response.status === 401) {
        Notify.failure(error.response.data.message);
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

export const updateUser = createAsyncThunk(
  '/users/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateProfile(data);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const needHelpOperation = createAsyncThunk(
  'needhelp',
  async (credentials, thunkAPI) => {
    try {
      const response = await needHelp(credentials);
      showSuccessToast('All data saved successfully');
      return response.data;
    } catch (error) {
      showErrorToast(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
