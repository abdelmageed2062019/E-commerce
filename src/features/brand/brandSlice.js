import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrand as fetchBrandAPI } from "./../../api/brandApi";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrnads",
  async (_, { rejectWithValue }) => {
    try {
      const brands = await fetchBrandAPI();
      return { brands };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.brands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
