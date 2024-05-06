import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasks-api';

export const fetchCards = createAsyncThunk(
  'tasks/fetchCards',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.getCards(data.boardId, data.columnId);
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCard = createAsyncThunk(
  'tasks/addCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.addCard(
        data.boardId,
        data.columnId,
        data.body
      );
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'tasks/deleteCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.removeCard(
        data.boardId,
        data.columnId,
        data.cardId
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editeCard = createAsyncThunk(
  'tasks/editeCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.editeBoard(
        data.boardId,
        data.columnId,
        data.cardId,
        data.body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
