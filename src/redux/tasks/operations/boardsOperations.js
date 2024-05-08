import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasks-api';

export const fetchBoards = createAsyncThunk(
  'tasks/fetcBoards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await tasksApi.getBoards();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'tasks/addBoard',
  async (body, { rejectWithValue }) => {
    try {
      const data = await tasksApi.addBoard(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'tasks/deleteBoard',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const data = await tasksApi.removeBoard(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editeBoard = createAsyncThunk(
  'tasks/editeBoard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.editeBoard(data.boardId, data.body);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
