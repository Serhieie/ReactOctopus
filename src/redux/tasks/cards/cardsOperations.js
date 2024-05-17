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

export const addCardOperation = createAsyncThunk(
  'cards/addCard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          cards: { items },
          columns: { items: columnItems },
        },
      } = getState();
      const response = await tasksApi.addCard(data);

      const newItems = [response, ...items];

      const newColumnItems = columnItems.map((column) => {
        if (column._id === data.columnId) {
          return {
            ...column,
            cards: [...column.cards, response],
          };
        }
        return column;
      });

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

      return { newActive, items: newItems, columnItems: newColumnItems };
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
          if (column._id === data.columnId) {
            return {
              ...column,
              cards: column.cards.filter((card) => {
                return card._id !== response;
              }),
            };
          }
          return column;
        }),
      };

      return { newActive, newItems };
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
          columns: { items },
        },
      } = getState();
      const response = await tasksApi.moveCard(data.card._id, {
        destinationColumnId: data.destinationColumnId,
        sourceIndex: data.sourceIndex,
        destinationIndex: data.destinationIndex,
      });
      const { destinationColumn, sourceColumn } = response;
      const newItems = items.map((column) => {
        if (column._id === destinationColumn._id) {
          return destinationColumn;
        }
        return column;
      });

      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column._id === sourceColumn._id) {
            return sourceColumn;
          } else if (column._id === destinationColumn._id) {
            return destinationColumn;
          }
          return column;
        }),
      };

      return { newActive, newItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeCardIndexOperation = createAsyncThunk(
  'cards/changeCardIndex',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          columns: { items },
        },
      } = getState();
      const { destinationColumnId, sourceIndex, destinationIndex } = data;
      const response = await tasksApi.changeCardIndex(data.card._id, {
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      });
      const newItems = items.map((column) => {
        if (column._id === destinationColumnId) {
          return response;
        }
        return column;
      });

      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column._id === destinationColumnId) {
            return response;
          }
          return column;
        }),
      };

      return { newItems, newActive };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
