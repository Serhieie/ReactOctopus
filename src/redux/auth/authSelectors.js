export const selectIsLogin = (state) => state.auth.isLogin;

export const selectToken = (state) => state.auth.token;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectAuthError = (state) => state.auth.error;

export const selectUser = (state) => state.auth.user;

export const selectUserTheme = (state) => state.auth.user.theme;

export const selectUserAvatar = (state) => state.auth.user.avatarURL;
