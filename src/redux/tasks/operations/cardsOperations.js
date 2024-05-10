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
      console.log(data);
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
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          cards: { items },
        },
      } = getState();
      const response = await tasksApi.removeCard(data.cardId);
      const newItems = items.filter((card) => card._id !== response);
      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          return {
            ...column,
            cards: column.cards.filter((card) => card._id !== response),
          };
        }),
      };

      return { newActive, items: newItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editeCard = createAsyncThunk(
  'tasks/editeCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.editeCard(
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

export const moveCardOperation = createAsyncThunk(
  'tasks/moveCard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
        },
      } = getState();
      const response = await tasksApi.moveCard(data.card._id, {
        destinationColumnId: data.destinationColumnId,
      });
      const { destinationColumn, sourceColumn } = response;
      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column._id === sourceColumn._id) {
            return {
              ...column,
              cards: column.cards.filter((card) => card._id !== data.card._id),
            };
          } else if (column._id === destinationColumn._id) {
            return {
              ...column,
              cards: [data.card, ...column.cards],
            };
          }
          return column;
        }),
      };

      return newActive;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
