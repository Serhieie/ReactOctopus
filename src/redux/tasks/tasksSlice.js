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
  reducers: {
    clearTasks: (state) => {
      state.boards = initialState.boards;
      state.columns = initialState.columns;
      state.cards = initialState.cards;
    },
    changeCardIndexLocal: (state, action) => {
      const { active } = state.boards;
      const { items } = state.columns;
      const { destinationColumnId, sourceIndex, destinationIndex, card } =
        action.payload;

      const newItems = items.map((column) => {
        if (column._id === destinationColumnId) {
          const newCards = [...column.cards];
          newCards.splice(sourceIndex, 1);
          newCards.splice(destinationIndex, 0, card);
          return {
            ...column,
            cards: newCards,
          };
        }
        return column;
      });

      const newActive = {
        ...active,
        columns: active.columns.map((column) => {
          if (column._id === destinationColumnId) {
            const newCards = [...column.cards];
            newCards.splice(sourceIndex, 1);
            newCards.splice(destinationIndex, 0, card);
            return {
              ...column,
              cards: newCards,
            };
          }
          return column;
        }),
      };

      state.columns.items = newItems;
      state.boards.active = newActive;
    },
    // moveCardIndexLocal: (state, action) => {
    //   const { active } = state.boards;
    //   const { items } = state.columns;
    //   const { destinationColumnId, sourceIndex, destinationIndex, card } =
    //     action.payload;

    //   const newItems = items.map((column) => {
    //     if (column._id === card.columnId) {
    //       const newCards = [...column.cards];
    //       newCards.splice(sourceIndex, 1);
    //       return {
    //         ...column,
    //         cards: newCards,
    //       };
    //     } else if (column._id === destinationColumnId) {
    //       const newCards = [...column.cards];
    //       newCards.splice(destinationIndex, 0, card);
    //       return {
    //         ...column,
    //         cards: newCards,
    //       };
    //     }
    //     return column;
    //   });

    //   const newActive = {
    //     ...active,
    //     columns: active.columns.map((column) => {
    //       if (column._id === card.columnId) {
    //         const newCards = [...column.cards];
    //         newCards.splice(sourceIndex, 1);
    //         return {
    //           ...column,
    //           cards: newCards,
    //         };
    //       } else if (column._id === destinationColumnId) {
    //         const newCards = [...column.cards];
    //         newCards.splice(destinationIndex, 0, card);
    //         return {
    //           ...column,
    //           cards: newCards,
    //         };
    //       }
    //       return column;
    //     }),
    //   };

    //   state.columns.items = newItems;
    //   state.boards.active = newActive;
    // },
  },
  extraReducers: (builder) => {
    builder
      //GET BOARDS
      .addCase(boardsOperations.fetchBoards.pending, (state) => {
        (state.boards.isLoading = true), (state.boards.error = null);
      })
      .addCase(boardsOperations.fetchBoards.fulfilled, (state, { payload }) => {
        (state.boards.isLoading = false),
          (state.boards.items = payload.data.result);

        state.boards.active = payload.activeBoard;
        state.columns.items = payload.activeBoard.columns;
        state.cards.items = payload.arrayOfCards;
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
            (state.boards.active = payload.data);
          state.columns.items = payload.data.columns;
          state.cards.items = payload.arrayOfCards;
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
        state.columns.items = [];
        state.cards.items = [];
        state.boards.items = payload.items;
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
          state.columns.items = payload.newActive.columns;
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

      //ADD COLUMN(UPDATEd)
      .addCase(columsOperations.addColumnOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.addColumnOperation.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            (state.columns.items = payload.newItems);
          state.boards.active = payload.newActive;
          state.columnsOrder = payload.newColumnsOrder;
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
            (state.boards.active = payload.active);
          state.columnsOrder = payload.newColumnsOrder;
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
          state.columns.items = payload.newActive.columns;
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

      //ADD CARD(UPDATED)
      .addCase(cardsOperations.addCardOperation.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(
        cardsOperations.addCardOperation.fulfilled,
        (state, { payload }) => {
          (state.cards.isLoading = false),
            (state.boards.active = payload.newActive);
          state.cards.items = payload.items;
        }
      )
      .addCase(
        cardsOperations.addCardOperation.rejected,
        (state, { payload }) => {
          (state.cards.isLoading = false), (state.cards.error = payload);
        }
      )

      //DELETE CARD(Updated)
      .addCase(cardsOperations.deleteCard.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(cardsOperations.deleteCard.fulfilled, (state, { payload }) => {
        (state.cards.isLoading = false),
          (state.boards.active = payload.newActive);
        state.cards.items = payload.newItems;
      })
      .addCase(cardsOperations.deleteCard.rejected, (state, { payload }) => {
        (state.cards.isLoading = false), (state.cards.error = payload);
      })

      //EDIT CARD(UPDATED)
      .addCase(cardsOperations.editCardOperation.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(
        cardsOperations.editCardOperation.fulfilled,
        (state, { payload }) => {
          state.cards.isLoading = false;
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
          state.boards.active = payload.newActive;
          state.columns.items = payload.newItems;
        }
      )
      .addCase(
        cardsOperations.moveCardOperation.rejected,
        (state, { payload }) => {
          (state.cards.isLoading = false), (state.cards.error = payload);
        }
      )
      //changeCardIndex
      .addCase(cardsOperations.changeCardIndexOperation.pending, (state) => {
        (state.cards.isLoading = true), (state.cards.error = null);
      })
      .addCase(
        cardsOperations.changeCardIndexOperation.fulfilled,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.cards.isLoading = false;
          state.columns.items = payload.newItems;
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        cardsOperations.changeCardIndexOperation.rejected,
        (state, { payload }) => {
          (state.cards.isLoading = false), (state.cards.error = payload);
        }
      )

      //changeColumnIndex
      .addCase(columsOperations.changeColumnIndexOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.changeColumnIndexOperation.fulfilled,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.boards.isLoading = false;
          state.columns.items = payload.newItems;
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        columsOperations.changeColumnIndexOperation.rejected,
        (state, { payload }) => {
          (state.columns.isLoading = false), (state.columns.error = payload);
        }
      );
  },
});

const persistConfig = {
  key: 'tasks',
  storage,
};
export const { clearTasks, changeCardIndexLocal, moveCardIndexLocal } =
  tasksSlice.actions;

export const persistedTasksReducer = persistReducer(
  persistConfig,
  tasksSlice.reducer
);

export default tasksSlice.reducer;
