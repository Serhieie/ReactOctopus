import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../api/tasks-api';

export const fetchColumns = createAsyncThunk(
  'tasks/fetchColumns',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.getColumns(data.boardId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'tasks/addColumn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.addColumn(data.boardId, data.body);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'tasks/deleteColumn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.removeColumn(data.boardId, data.columnId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editeColumn = createAsyncThunk(
  'tasks/editeColumn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.editeBoard(
        data.boardId,
        data.columnId,
        data.body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
