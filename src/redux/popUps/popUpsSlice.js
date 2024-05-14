import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState } from './popUpsInitialState';
import handlers from './popUpsHandlers';

export const popUpsSlice = createSlice({
  name: 'popUps',
  initialState,
  reducers: {
    setIsSideBarOpen(state, action) {
      state.isSideBarOpen = action.payload;
    },
    setIsChangeThemePopUpOpen(state, action) {
      const isOpen = action.payload;
      handlers.setChangeThemePopUpState(state, isOpen);
    },
    setIsMoveCardPopUpOpen(state, action) {
      const isOpen = action.payload;
      handlers.setPopUpState(state, 'isMoveCardPopUpOpen', isOpen);
    },
    setIsHelpPopUpOpen(state, action) {
      const isOpen = action.payload;
      handlers.setPopUpState(state, 'isHelpPopUpOpen', isOpen);
    },
    setIsUserModalOpen(state, action) {
      const isOpen = action.payload;
      handlers.setPopUpState(state, 'isUserModalOpen', isOpen);
    },
    setIsFiltersOpen(state, action) {
      const isOpen = action.payload;
      handlers.setIsFiltersOpenState(state, isOpen);
    },
  },
});

const persistConfig = {
  key: 'popUps',
  storage,
  whitelist: ['isSideBarOpen'],
};

export const persistedPopUpsReducer = persistReducer(
  persistConfig,
  popUpsSlice.reducer
);

export const {
  setIsFiltersOpen,
  setIsUserModalOpen,
  setIsSideBarOpen,
  setIsChangeThemePopUpOpen,
  setIsMoveCardPopUpOpen,
  setIsHelpPopUpOpen,
} = popUpsSlice.actions;

export default popUpsSlice.reducer;
