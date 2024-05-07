import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/filterSelectors';

const selectTasksState = (state) => state.tasks;
const selectAllCards = (store) => store.tasks.cards.items;

export const selectBoardsState = createSelector(
  selectTasksState,
  (tasksState) => tasksState.boards
);

export const selectColumnsState = createSelector(
  selectTasksState,
  (tasksState) => tasksState.columns
);

export const selectCardsState = createSelector(
  selectTasksState,
  (tasksState) => tasksState.cards
);

export const selectFilteredCards = createSelector(
  [selectAllCards, selectFilter],
  (items, filter) => {
    if (!filter) {
      return items;
    }
    const filteredCards = items.filter(({ label }) => label === filter);
    return filteredCards;
  }
);

// export const selectBoardsState = state => state.tasks.boards
// export const selectColumnsState = state => state.tasks.columns
// export const selectCardsState = state => state.tasks.cards
