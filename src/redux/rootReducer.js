import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '../redux/auth/authSlice';
import filterReducer from '../redux/filter/filterSlice';
import { persistedPopUpsReducer } from './popUps/popUpsSlice';
import { persistedTasksReducer } from '../redux/tasks/tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'user'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  tasks: persistedTasksReducer,
  filter: filterReducer,
  popUps: persistedPopUpsReducer,
});

export default rootReducer;
