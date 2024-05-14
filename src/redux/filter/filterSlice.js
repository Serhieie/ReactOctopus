import { createSlice } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import persistReducer from 'redux-persist/es/persistReducer';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});

export const { setFilter } = filterSlice.actions;

// const persistConfig = {
//   key: 'filter',
//   storage,
// };

// export const persistedFilterReducer = persistReducer(
//   persistConfig,
//   filterSlice.reducer
// );

export const filterReducer = filterSlice.reducer;
