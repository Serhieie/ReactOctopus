import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(`/api/tasks`, values);
            Notiflix.Notify.success('Task added!');
            return response.data;
        } catch (e) {
            Notiflix.Notify.failure('Something going wrong!');
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);