import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '../redux/auth/authSlice';
import tasksReduser from '../redux/tasks/tasksSlice';
import filterReducer from '../redux/filter/filterSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  tasks: tasksReduser,
  filter: filterReducer,
});

export default rootReducer;
