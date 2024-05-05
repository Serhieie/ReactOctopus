import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccessToast, showErrorToast } from '../showToast';

export const updateUser = createAsyncThunk(
    '/users/edit',
    async (credentials, thunkAPI) => {
      const theme = thunkAPI.getState()?.theme?.currentTheme;
      try {
        const response = await axios.patch('/users/edit', credentials);
        showSuccessToast('All data saved successfully', theme)
        return response.data;
      } catch (error) {
        showErrorToast(error.response.data.message, theme);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  