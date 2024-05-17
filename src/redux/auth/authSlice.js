import { createSlice } from '@reduxjs/toolkit';
import {
  signUp,
  logIn,
  current,
  logOut,
  needHelpOperation,
  updateUser,
} from './authOperations';
import { initialState } from './authInitialState';
import { handlePending, handleRejected } from './authHandlers';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTheme(state) {
      state.user.theme = "dark";
    },
    setTokenToRedux(state, action) {
      state.token = action.payload;
    },
    clearTokenToRedux(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signUp
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isLogin = true;
        state.token = payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, handleRejected)
      //logIn
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isLogin = true;
        state.token = payload.token;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)
      //current
      .addCase(current.pending, handlePending)
      .addCase(current.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { ...state.user, ...payload };
        state.isLogin = true;
        state.error = null;
      })
      .addCase(current.rejected, (state) => {
        state.isLoading = false;
        state.token = '';
      })
      //logOut
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {};
        state.isLogin = false;
        state.token = '';
        state.error = null;
      })
      .addCase(logOut.rejected, handleRejected)
      //Update
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { ...state.user, ...payload };
        state.error = null;
      })
      .addCase(updateUser.rejected, handleRejected)
      //NeedHelp
      .addCase(needHelpOperation.pending, handlePending)
      .addCase(needHelpOperation.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(needHelpOperation.rejected, handleRejected);
  },
});

export const { setTokenToRedux, clearTokenToRedux } = authSlice.actions;

export const authReducer = authSlice.reducer;
