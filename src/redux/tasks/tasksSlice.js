import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './tasksInitialState';
import * as boardsOperations from './boards/boardsOperations';
import * as columsOperations from './columns/columnsOperations';
import * as cardsOperations from './cards/cardsOperations';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder

      //GET BOARDS
      .addCase(boardsOperations.fetchBoards.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.fetchBoards.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.items = payload.result);
        if (state.boards.active === null) {
          state.boards.active = payload.result[0];
        }

        // state.columns.items = payload.newActive.columns;
        // state.cards.items = payload.newActive.columns.cards;
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
          state.columns.items = payload.columns;
          state.cards.items = payload.columns.cards;
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
        (state.boards.isLoading = false),
          (state.boards.items = payload.newItems);
        if (payload.newActive) state.boards.active = payload.newActive;
      })
      .addCase(boardsOperations.addBoard.rejected, (state, { payload }) => {
        (state.boards.isLoading = false), (state.boards.error = payload);
      })

      //DELETE BOARD(Updated)
      .addCase(boardsOperations.deleteBoard.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.deleteBoard.fulfilled, (state, { payload }) => {
        state.boards.isLoading = false;
        state.boards.active = payload.newActive;
        state.boards.items = payload.items;
        state.boards.lastDeleted = payload.items;
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
          state.boards.active = payload.newActive;
          state.boards.items = payload.newItems;
        }
      )
      .addCase(
        boardsOperations.editeBoardOperation.rejected,
        (state, { payload }) => {
          state.boards.isLoading = false;
          state.boards.error = payload;
        }
      )

      //FETCH COLUMNS
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

      //ADD COLUMN(UPDATED BUT DIDNT CHECKED)
      .addCase(columsOperations.addColumnOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.addColumnOperation.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            (state.columns.items = payload.newItems);
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        columsOperations.addColumnOperation.rejected,
        (state, { payload }) => {
          (state.columns.isLoading = false), (state.columns.error = payload);
        }
      )

      //DELETE COLUMN(Updated)
      .addCase(columsOperations.deleteColumn.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.deleteColumn.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            (state.columns.items = payload.items);
          state.boards.active = payload.newActive;
        }
      )
      .addCase(columsOperations.deleteColumn.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })

      //EDIT COLUMN
      .addCase(columsOperations.editColumnOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.editColumnOperation.fulfilled,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.columns.items = payload.newItems;
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        columsOperations.editColumnOperation.rejected,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.columns.error = payload;
        }
      )

      //FETCH CARDS
      .addCase(cardsOperations.fetchCards.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.fetchCards.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.items = payload);
      })
      .addCase(cardsOperations.fetchCards.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })

      //ADD CARD(UPDATED BUT DIDNT CHECKED)
      .addCase(cardsOperations.addCard.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.addCard.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false),
          (state.cards.items = payload.newItems),
          (state.boards.active = payload.newActive);
      })
      .addCase(cardsOperations.addCard.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })

      //DELETE CARD(Updated)
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

      //EDIT CARD(UPDATED BUT DIDNT CHECKED)
      .addCase(cardsOperations.editCardOperation.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(
        cardsOperations.editCardOperation.fulfilled,
        (state, { payload }) => {
          state.cards.isLoading = false;
          state.cards.items = payload.newItems;
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        cardsOperations.editCardOperation.rejected,
        (state, { payload }) => {
          state.cards.isLoading = false;
          state.cards.error = payload;
        }
      )

      //MOVE CARD(Updated)
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
  blacklist: ['cards', 'columns'],
};

export const persistedTasksReducer = persistReducer(
  persistConfig,
  tasksSlice.reducer
);

export default tasksSlice.reducer;
