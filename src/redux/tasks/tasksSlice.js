import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './tasksInitialState';
import * as boardsOperations from './operations/boardsOperations';
import * as columsOperations from './operations/columnsOperations';
import * as cardsOperations from './operations/cardsOperations';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(boardsOperations.fetchBoards.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.fetchBoards.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload.result);
      })
      .addCase(boardsOperations.fetchBoards.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })
      .addCase(boardsOperations.fetchBoardById.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(
        boardsOperations.fetchBoardById.fulfilled,
        (state, { payload }) => {
          // console.log('ACTIVE', payload._id);
          // console.log('COLUMNS', payload.columns);
          (state.boards.isLoading = false),
            (state.columns.isLoading = false),
            (state.boards.active = payload);
          state.columns.items = payload.columns;
          state.cards.items = [];
          payload.columns.forEach((column) => {
            state.cards.items.unshift(...column.cards);
          });
        }
      )
      .addCase(
        boardsOperations.fetchBoardById.rejected,
        (state, { payload }) => {
          (state.boards.isLoading = false), (state.boards.error = payload);
        }
      )

      .addCase(boardsOperations.addBoard.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.addBoard.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload);
      })
      .addCase(boardsOperations.addBoard.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })

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
      )
      .addCase(columsOperations.fetchColumns.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.fetchColumns.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false), (state.columns.items = payload);
        }
      )
      .addCase(columsOperations.fetchColumns.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })
      .addCase(columsOperations.addColumn.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(columsOperations.addColumn.fulfilled, (state, { payload }) => {
        (state.columns.isLoading = false), state.columns.items.push(payload);
      })
      .addCase(columsOperations.addColumn.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })
      .addCase(columsOperations.deleteColumn.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.deleteColumn.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            state.columns.items.filter(({ _id }) => _id !== payload);
        }
      )
      .addCase(columsOperations.deleteColumn.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })
      .addCase(columsOperations.editeColumn.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(columsOperations.editeColumn.fulfilled, (state, { payload }) => {
        state.columns.isLoading = false;
        const idx = state.columns.items.findIndex(
          (column) => column._id === payload._id
        );
        state.columns.items.splice(idx, 1, payload);
      })
      .addCase(columsOperations.editeColumn.rejected, (state, { payload }) => {
        state.columns.isLoading = false;
        state.columns.error = payload;
      })
      .addCase(cardsOperations.fetchCards.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.fetchCards.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.items = payload);
      })
      .addCase(cardsOperations.fetchCards.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })
      .addCase(cardsOperations.addCard.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.addCard.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false), state.cards.items.push(payload);
      })
      .addCase(cardsOperations.addCard.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })
      .addCase(cardsOperations.deleteCard.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.deleteCard.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.items = payload.items);
        state.boards.active = payload.newActive;
      })
      .addCase(cardsOperations.deleteCard.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })
      .addCase(cardsOperations.editeCard.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.editeCard.fulfilled, (state, { payload }) => {
        state.cards.isLoading = false;
        const idx = state.cards.items.findIndex(
          (card) => card._id === payload._id
        );
        state.cards.items.splice(idx, 1, payload);
      })
      .addCase(cardsOperations.editeCard.rejected, (state, { payload }) => {
        state.cards.isLoading = false;
        state.cards.error = payload;
      })
      .addCase(cardsOperations.moveCardOperation.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(
        cardsOperations.moveCardOperation.fulfilled,
        (state, { payload }) => {
          state.boards.isLoading = false;
          state.columns.isLoading = false;
          state.cards.isLoading = false;
          state.boards.active = payload;
        }
      )
      .addCase(
        cardsOperations.moveCardOperation.rejected,
        (state, { payload }) => {
          (state.cards.isLoading = false), (state.cards.error = payload);
        }
      );
  },
});

const persistConfig = {
  key: 'tasks',
  storage,
  whitelist: ['boards'],
};

export const persistedTasksReducer = persistReducer(
  persistConfig,
  tasksSlice.reducer
);

export default tasksSlice.reducer;
