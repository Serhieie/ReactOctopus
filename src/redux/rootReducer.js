import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../redux/auth/authSlice';
import { filterReducer } from '../redux/filter/filterSlice';
// import columnsReducer from './tasks/columns/columnsSlice';
// import cardsReducer from './tasks/cards/cardsSlice';
// import { persistedBoardsReducer } from './tasks/boards/boardsSlice';
import { persistedPopUpsReducer } from './popUps/popUpsSlice';

import { persistedTasksReducer } from './tasks/tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'user'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  // boards: persistedBoardsReducer,
  // columns: columnsReducer,
  // cards: cardsReducer,
  tasks: persistedTasksReducer,
  filter: filterReducer,
  // filter: persistedFilterReducer,
  popUps: persistedPopUpsReducer,
});

export default rootReducer;
