import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../tasksInitialState';
import * as boardsOperations from './boardsOperations';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: (builder) => {
    builder

      //GET BOARDS
      .addCase(boardsOperations.fetchBoards.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.fetchBoards.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload.result);
      })
      .addCase(boardsOperations.fetchBoards.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })

      //GET BOARD BY ID(Updated)
      .addCase(boardsOperations.fetchBoardById.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(
        boardsOperations.fetchBoardById.fulfilled,
        (state, { payload }) => {
          (state.boards.isLoading = false),
            (state.columns.isLoading = false),
            (state.boards.active = payload);
          state.columns.items = [...payload.columns];
          state.cards.items = [...payload.columns.cards];
        }
      )
      .addCase(
        boardsOperations.fetchBoardById.rejected,
        (state, { payload }) => {
          (state.boards.isLoading = false), (state.boards.error = payload);
        }
      )

      //ADD BOARD(Updated)
      .addCase(boardsOperations.addBoard.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.addBoard.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload);
      })
      .addCase(boardsOperations.addBoard.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })

      //DELETE BOARD(Updated)
      .addCase(boardsOperations.deleteBoard.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.deleteBoard.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload.items);
        state.boards.active = payload.newActive;
      })
      .addCase(boardsOperations.deleteBoard.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })

      //EDIT BOARD(Updated)
      .addCase(boardsOperations.editeBoardOperation.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(
        boardsOperations.editeBoardOperation.fulfilled,
        (state, { payload }) => {
          state.boards.isLoading = false;
          const idx = state.boards.items.findIndex(
            (board) => board._id === payload.response._id
          );
          state.boards.items.splice(idx, 1, payload.response);
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        boardsOperations.editeBoardOperation.rejected,
        (state, { payload }) => {
          state.boards.isLoading = false;
          state.boards.error = payload;
        }
      );
  },
});

const persistConfig = {
  key: 'boards',
  storage,
  whitelist: ['boards'],
};

export const persistedBoardsReducer = persistReducer(
  persistConfig,
  boardsSlice.reducer
);

export default boardsSlice.reducer;
