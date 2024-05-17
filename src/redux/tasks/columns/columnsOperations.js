import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasks-api';

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tasksApi.getColumns(data.boardId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addColumnOperation = createAsyncThunk(
  'columns/addColumn',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          columns: { items },
          columnsOrder,
        },
      } = getState();
      const response = await tasksApi.addColumn(data);
      const newItems = [...items, response];
      const newColumnsOrder = [...columnsOrder, response._id];

      const newActive = {
        ...active,
        columns: [...active.columns, response],
      };

      return { newItems, newActive, newColumnsOrder };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          columnsOrder,
        },
      } = getState();
      const response = await tasksApi.removeColumn(data.columnId);

      const newColumnsOrder = columnsOrder.filter(
        (columnId) => columnId !== response
      );
      const newActive = {
        ...active,
        columns: active.columns.filter((column) => column._id !== response),
      };

      return { active: newActive, newColumnsOrder };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editColumnOperation = createAsyncThunk(
  'columns/editColumn',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
          columns: { items },
        },
      } = getState();
      const response = await tasksApi.editColumn(data.columnId, data.body);
      const updatedItems = [...items];
      const columnIndex = updatedItems.findIndex(
        (column) => column._id === data.columnId
      );

      if (columnIndex !== -1) {
        updatedItems[columnIndex] = response;

        const newActive = {
          ...active,
          columns: active.columns.map((column) => {
            if (column._id === data.columnId) {
              return response;
            }
            return column;
          }),
        };

        return { newActive, items: updatedItems };
      }

      return { newActive: active, items };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeColumnIndexOperation = createAsyncThunk(
  'cards/changeColumnIndex',
  async (data, { rejectWithValue }) => {
    try {
      const { boardId, destinationIndex, columnId } = data;
      const response = await tasksApi.changeColumnIndex(columnId, {
        boardId,
        destinationIndex,
      });

      return { newActive: response, newItems: response.columns };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
