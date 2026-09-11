import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import type {
  AuthState,
  LoginRequest
} from "../../types/auth";

import { loginApi } from "../../api/authApi";

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken,
  isAuthenticated: Boolean(savedToken),
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    loginData: LoginRequest,
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(loginData);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;