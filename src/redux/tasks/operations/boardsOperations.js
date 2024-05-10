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

export const fetchBoardById = createAsyncThunk(
  'tasks/fetcBoardById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await tasksApi.getBoardById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'tasks/addBoard',
  async (body, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { items },
        },
      } = getState();
      const data = await tasksApi.addBoard(body);
      const newItems = [...items, data];

      return newItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'tasks/deleteBoard',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { items, active },
        },
      } = getState();
      const response = await tasksApi.removeBoard(id);
      const newItems = items.filter((card) => card._id !== response);
      if (active._id === response) {
        const newActiveId =
          response === items[0]._id ? items[1]._id : items[0]._id;
        const newActive = await tasksApi.getBoardById(newActiveId);

        return { newActive, items: newItems };
      }
      return { newActive: active, items: newItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// background: 'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/e5l6os2xwkgtjmbkfuw6.webp';
// columns: (4)[
//   ('663ccd8259505135eab133c0',
//   '663ccd9a59505135eab133c5',
//   '663ccdb859505135eab133ca',
//   '663ccdc559505135eab133cf')
// ];
// createdAt: '2024-05-09T13:15:25.326Z';
// iconId: 'loading';
// owner: '663ccbf759505135eab133a7';
// title: 'Project Office';
// updatedAt: '2024-05-10T13:32:44.726Z';
// _id: '663ccc6d59505135eab133b0';

export const editeBoardOperation = createAsyncThunk(
  'tasks/editeBoard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
        },
      } = getState();
      const response = await tasksApi.editeBoard(data.boardId, data.body);
      const newActive = {
        ...active,
        title: response.title,
        iconId: response.iconId,
        background: response.background,
      };

      return { newActive, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
