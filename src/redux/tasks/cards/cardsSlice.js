import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../tasksInitialState';
import * as cardsOperations from './cardsOperations';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  extraReducers: (builder) => {
    builder
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

export default cardsSlice.reducer;
