import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as fetchProductsAPI } from "../../api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { products, totalPages } = await fetchProductsAPI(page, limit);
      return { products, totalPages, currentPage: page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentPage: 1,
    numberOfPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
