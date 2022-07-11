import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      msg: "",
    },
    deleteUser: {
      isFetching: false,
      error: false,
      msg: "",
    },
    logoutUser: {
      isFetching: false,
      error: false,
      msg: "",
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.msg = action.payload;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    deleteUserStart: (state) => {
      state.deleteUser.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.msg = action.payload;
    },
    deleteUserFailed: (state,action) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.error = true;
      state.deleteUser.msg = action.payload
    },
    logoutStart: (state) => {
      state.logoutUser.isFetching = true
    },
    logoutSuccess: (state) => {
      state.logoutUser.isFetching = false
    },
    logoutFaild: (state) => {
      state.logoutUser.isFetching = false
    }
  },
});

export const {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  logoutStart,
  logoutSuccess,
  logoutFaild
} = authSlice.actions;
export default authSlice.reducer;
