import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasks-api';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
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
  'cards/addCard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          cards: { items },
        },
      } = getState();
      const response = await tasksApi.addCard(data);
      const newItems = [response, ...items];

      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column._id === data.columnId) {
            return {
              ...column,
              cards: [response, ...column.cards],
            };
          } else {
            return column;
          }
        }),
      };
      return { newActive, items: newItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
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

export const editCardOperation = createAsyncThunk(
  'cards/editCard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          cards: { items },
        },
      } = getState();
      const response = await tasksApi.editCard(data.cardId, data.body);
      const updatedItems = [...items];
      const cardIndex = updatedItems.findIndex(
        (card) => card._id === data.cardId
      );
      if (cardIndex !== -1) {
        updatedItems[cardIndex] = response;
      }
      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column.cards.some((card) => card._id === data.cardId)) {
            return {
              ...column,
              cards: column.cards.map((card) => {
                if (card._id === data.cardId) {
                  return response;
                }
                return card;
              }),
            };
          } else {
            return column;
          }
        }),
      };
      return { newActive, items: updatedItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moveCardOperation = createAsyncThunk(
  'cards/moveCard',
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