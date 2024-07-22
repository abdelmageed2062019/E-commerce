// authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi";
import { setToken } from "../../utils/tokenUtils";
import { getUserCart } from "../cart/cartSlice";
import { setCredentials } from "./authSlice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      const { token, user } = response.data;
      setToken(token);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.login(userData);
      const { token, user } = response.data;
      setToken(token);
      dispatch(setCredentials({ token, user }));
      dispatch(getUserCart());
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
