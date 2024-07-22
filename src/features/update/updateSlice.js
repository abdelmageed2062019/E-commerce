import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../api/updateApi";

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(token, userData);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
